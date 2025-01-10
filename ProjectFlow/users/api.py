from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        return Response({'error': 'Неверные учетные данные'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Позволяет доступ всем пользователям

    def post(self, request):
        first_name = request.data.get('first_name')
        middle_name = request.data.get('middle_name')
        last_name = request.data.get('last_name')    
        email = request.data.get('email')
        password = request.data.get('password')

        # Проверка существования пользователя
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Пользователь с таким email уже существует.'}, status=status.HTTP_400_BAD_REQUEST)

        # Создание нового пользователя
        user = CustomUser.objects.create_user(
            username=email,  # Используем email в качестве username
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        
        # Устанавливаем отчество и сохраняем пользователя
        user.middle_name = middle_name
        user.save()

        return Response({'message': 'Успешная регистрация'}, status=status.HTTP_201_CREATED)
    
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request):
        user = request.user
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'middle_name': user.middle_name,
            'email': user.email,
        })