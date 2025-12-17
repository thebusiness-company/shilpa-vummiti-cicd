import random
from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone

class Order(models.Model):
    order_id = models.CharField(max_length=50, unique=True, editable=False)
    cart = models.ForeignKey('product.Cart', on_delete=models.PROTECT, related_name='orders')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.ForeignKey('OrderAddress', on_delete=models.SET_NULL, null=True, blank=True)  
    razorpay_order_id = models.CharField(max_length=255)
    razorpay_payment_id = models.CharField(max_length=255, null=True, blank=True)
    razorpay_signature = models.CharField(max_length=255, null=True, blank=True)
    payment_status = models.CharField(max_length=20, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    delivered_at = models.DateTimeField(null=True, blank=True)
    def generate_unique_order_id(self):
        while True:
            random_code = f"ORD-{random.randint(100000, 999999)}"
            if not Order.objects.filter(order_id=random_code).exists():
                return random_code

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = self.generate_unique_order_id()

        if self.pk:
            previous = Order.objects.get(pk=self.pk)
            if previous.status != 'delivered' and self.status == 'delivered':
                self.delivered_at = timezone.now()

        super().save(*args, **kwargs)

        
class OrderAddress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    orderedname = models.CharField(max_length=25)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100) 
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='India')
    is_default = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.orderedname} , {self.city}"
    

