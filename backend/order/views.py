from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .models import Order, OrderAddress
from product.models import Cart
from .serializers import OrderSerializer, AddressSerializer
import razorpay
import logging
from django.core.mail import send_mail
from django.template.loader import render_to_string


logger = logging.getLogger(__name__)
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .models import Order, OrderAddress
from product.models import Cart
from .serializers import OrderSerializer, AddressSerializer
import razorpay
import logging
from django.core.mail import send_mail

logger = logging.getLogger(__name__)
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class CreateOrderView(APIView):
    def post(self, request):
        try:
            cart_code = request.data.get('cart_code')
            amount = int(request.data.get('amount'))  # amount should be in paise (e.g., ₹499 = 49900)

            if not cart_code or not amount:
                return Response({'error': 'cart_code and amount are required'}, status=status.HTTP_400_BAD_REQUEST)

            # Create Razorpay Order
            razorpay_order = client.order.create({
                'amount': amount,
                'currency': 'INR',
                'payment_capture': 1
            })

            if not razorpay_order or 'id' not in razorpay_order:
                return Response({'error': 'Failed to create Razorpay order'}, status=status.HTTP_400_BAD_REQUEST)

            cart = Cart.objects.get(cart_code=cart_code)
            order = Order.objects.create(
                cart=cart,
                user=request.user if request.user.is_authenticated else None,
                razorpay_order_id=razorpay_order['id'],
                total_amount=amount / 100
            )

            return Response({
                'order_id': razorpay_order['id'],
                'razorpay_key': settings.RAZORPAY_KEY_ID,
                'amount': amount,
                'currency': 'INR',
                'name': 'Shilpa vummiti',
                'description': 'Order Payment'
            })

        except Cart.DoesNotExist:
            logger.error("Cart not found for cart_code: %s", cart_code)
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception("Error creating Razorpay order")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VerifyPaymentView(APIView):
    def post(self, request):
        data = request.data
        cart_code = data.get('cart_code')
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_signature = data.get('razorpay_signature')
        address_data = data.get('address')

        if not all([cart_code, razorpay_payment_id, razorpay_order_id, razorpay_signature, address_data]):
            return Response({'error': 'Missing required data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify Razorpay signature
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })
        except Exception as e:
            logger.warning("Invalid Razorpay signature: %s", str(e))
            return Response({'error': 'Invalid payment signature'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            order = Order.objects.get(razorpay_order_id=razorpay_order_id, cart__cart_code=cart_code)
            order.razorpay_payment_id = razorpay_payment_id
            order.razorpay_signature = razorpay_signature
            order.payment_status = 'completed'
            order.save()

            cart = order.cart
            cart.paid = True
            cart.save()

            address_serializer = AddressSerializer(data=address_data)
            if address_serializer.is_valid():
                address = address_serializer.save(user=request.user if request.user.is_authenticated else None)
                order.address = address
                order.save()

                # Send order confirmation email
                subject = "🎉 Order Confirmation - Thank you for your purchase!"
                message = f"""
Hi {address.orderedname},

Your order with ID #{order.id} has been successfully placed!

Thank you for shopping with us.

We'll notify you once your order is shipped.

Best regards,  
The Shilpa Vummiti Team
"""
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [address.email],
                    fail_silently=False,
                )

            else:
                return Response({'error': address_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Payment verified and order created successfully', 'order_id': order.id})

        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception("Error verifying payment")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class GetUserAddressesView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            addresses = OrderAddress.objects.filter(user=request.user)
            serializer = AddressSerializer(addresses, many=True)
            return Response(serializer.data)
        return Response([], status=status.HTTP_200_OK)


class DeleteUserAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        address_id = request.data.get("id")
        try:
            address = OrderAddress.objects.get(id=address_id, user=request.user)
            address.delete()
            return Response({"message": "Address deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except OrderAddress.DoesNotExist:
            return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)


class CancelPaymentView(APIView):
    def post(self, request):
        cart_code = request.data.get('cart_code')
        razorpay_order_id = request.data.get('razorpay_order_id')

        if not cart_code or not razorpay_order_id:
            return Response({'error': 'cart_code and razorpay_order_id are required'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            order = Order.objects.get(
                razorpay_order_id=razorpay_order_id,
                cart__cart_code=cart_code,
                payment_status='pending'
            )
            order.payment_status = 'cancelled'
            order.save()

            return Response({'message': 'Order cancelled successfully'})
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            if request.user.is_authenticated and order.user != request.user:
                return Response({'error': 'You do not have permission to view this order'}, status=status.HTTP_403_FORBIDDEN)

            serializer = OrderSerializer(order)
            return Response(serializer.data)

        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching order details: {str(e)}")
            return Response({'error': 'An error occurred while fetching order details'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserOrdersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            orders = Order.objects.filter(user=request.user).order_by('-created_at')
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)
        
        except Exception as e:
            logger.error(f"Error fetching user orders: {str(e)}")
            return Response({'error': 'An error occurred while fetching your orders'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


