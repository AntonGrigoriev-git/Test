from django.urls import path
from .api import LoginView, RegisterView, UserInfoView

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/user-info/', UserInfoView.as_view(), name='user_info'),
]
