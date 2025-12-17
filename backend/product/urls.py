# urls.py

from django.urls import path
from .views import CategoryListView, ProductByCategoryView, ProductDetailBySlugView,CartItemAPIView,product_in_cart,CartItemDetailAPIView,WishlistView,CartProductStatus

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('products/<int:category_id>/', ProductByCategoryView.as_view()),
    path('product/<slug:slug>/', ProductDetailBySlugView.as_view(), name='product-detail-by-slug'),
    path('cart-items/', CartItemAPIView.as_view(), name='cart-items'),
    path('product_in_cart/', product_in_cart, name='product_in_cart'),
    path('cart-items/<int:pk>/', CartItemDetailAPIView.as_view(), name='cart-item-detail'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('get_cart_status/',CartProductStatus.as_view(),name='cart-status')

]
