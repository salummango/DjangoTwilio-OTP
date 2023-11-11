# user/urls.py
from django.urls import path
from .views import RegisterUser, LoginUser, LogoutUser, VerifyOTP

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout', LogoutUser.as_view(), name='logout'),
    path('verify_otp/', VerifyOTP.as_view(), name='verify_otp'),
]
