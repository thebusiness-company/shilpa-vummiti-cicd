# utils/email.py

from django.core.mail import send_mail
from django.conf import settings

def send_order_success_email(to_email, order_id, customer_name):
    subject = "🎉 Order Confirmation - Thank you for your purchase!"
    message = f"""
Hi {customer_name},

Your order with ID #{order_id} has been successfully placed!

Thank you for shopping with us.

We'll notify you once your order is shipped.

Best regards,  
The Shilpa Vummiti Team
"""
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [to_email],
        fail_silently=False,
    )
