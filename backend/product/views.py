# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Product,Cart,CartItem,Wishlist
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class ProductByCategoryView(APIView):
    def get(self, request, category_id):
        limit = request.GET.get('limit')
        products = Product.objects.filter(category_id=category_id).order_by('-created_at')
        if limit:
            products = products[:int(limit)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
class ProductDetailBySlugView(APIView):
    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

class CartItemAPIView(APIView):
    def post(self, request):
        try:
            cart_code = request.data.get("cart_code")
            product_id = request.data.get("product_id")
            product_size =request.data.get("selectedSize")

            cart, _ = Cart.objects.get_or_create(cart_code=cart_code)
            product = Product.objects.get(id=product_id)

            cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)

            if not created:
                return Response(
                    {"detail": "Already in cart"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            cartitem.quantity = 1
            cartitem.product_size=product_size
            cartitem.save()

            serializer = CartItemSerializer(cartitem)
            return Response(
                {"data": serializer.data, "message": "CartItem created successfully"},
                status=status.HTTP_201_CREATED
            )

        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        cart_code = request.query_params.get("cart_code")
        if not cart_code:
            return Response({"error": "cart_code is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(cart_code=cart_code)
            cart_items = CartItem.objects.filter(cart=cart)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    
  
class CartItemDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    lookup_field = 'pk'

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get('cart_code')
    product_id = request.query_params.get('product_id')
    
    if not cart_code or not product_id:
        return Response({'error': 'cart_code and product_id are required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        cart = Cart.objects.get(cart_code=cart_code)
        product = Product.objects.get(id=product_id)
        product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
        return Response({'product_in_cart': product_exists_in_cart})
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class WishlistView(APIView):
    def get(self, request):
        cart_code = request.query_params.get('cart_code')
        if not cart_code:
            return Response({'error': 'cart_code is required'}, status=status.HTTP_400_BAD_REQUEST)

        wishlist = Wishlist.objects.filter(cart_code=cart_code).order_by('-added_at')
        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        cart_code = request.data.get('cart_code')
        product_id = request.data.get('product_id')

        if not cart_code or not product_id:
            return Response({'error': 'cart_code and product_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Wishlist.objects.filter(cart_code=cart_code, product_id=product_id).exists():
            return Response({'message': 'Already in wishlist'}, status=status.HTTP_200_OK)

        try:
            Wishlist.objects.create(cart_code=cart_code, product_id=product_id)
            return Response({'message': 'Added to wishlist'}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        cart_code = request.data.get('cart_code')
        product_id = request.data.get('product_id')

        if not cart_code or not product_id:
            return Response({'error': 'cart_code and product_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = Wishlist.objects.get(cart_code=cart_code, product_id=product_id)
            item.delete()
            return Response({'message': 'Removed from wishlist'}, status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({'error': 'Item not in wishlist'}, status=status.HTTP_404_NOT_FOUND)



class CartProductStatus(APIView):
    
    def get(self, request):
        cart_code = request.query_params.get("cart_code")
        if not cart_code:
            return Response({"error": "cart_code is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            cart = Cart.objects.get(cart_code=cart_code,paid =False)
            serializer = SimpleCartSerializer(cart)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)  