from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from .models import EmailConfirmationModel


class TodoList(ListAPIView):
    serializer_class = None

    def list(self, request, *args, **kwargs):
        api_list = {
            "signup": f"{request.build_absolute_uri()}/signup",
            "login": f"{request.build_absolute_uri()}/login",
            "profile": f"{request.build_absolute_uri()}/profile",
        }
        return Response(api_list, status=status.HTTP_200_OK)


class UserProfile(ListAPIView):
    serializer_class = CustomUserSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return CustomUser.objects.filter(id=user_id)


class RegisterUser(CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = CustomUser.objects.create_user(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User registration successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = CustomUser.objects.get(email=serializer.data['email'])
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'email': user.email
            })
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class UserInformationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        email = request.email
        is_email_confirmed = user.email_confirmed
        return Response({'email': email, 'is_email_confirmed': is_email_confirmed}, status.HTTP_200_OK)


class SentEmailConfirmationTokenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        token = EmailConfirmationModel.objects.create(user=user)
