from django.contrib import admin
from . models import Category,Product,ProductImage,Cart,CartItem,Wishlist,ProductSize
# Register your models here.
admin.site.register([Category,Product,ProductImage,Cart,CartItem,Wishlist,ProductSize])