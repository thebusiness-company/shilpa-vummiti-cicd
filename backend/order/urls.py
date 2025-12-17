from django.urls import path
from .views import (
    CreateOrderView, VerifyPaymentView, GetUserAddressesView,
    DeleteUserAddressView, CancelPaymentView, OrderDetailView, UserOrdersView
)

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('verify-payment/', VerifyPaymentView.as_view(), name='verify-payment'),
    path('addresses/', GetUserAddressesView.as_view(), name='get-addresses'),
    path('delete-address/', DeleteUserAddressView.as_view(), name='delete-address'),
    path('cancel-order/', CancelPaymentView.as_view(), name='cancel-order'),
    path('order/<int:order_id>/', OrderDetailView.as_view(), name='order-detail'),
    path('my-orders/', UserOrdersView.as_view(), name='user-orders'),
    
]
