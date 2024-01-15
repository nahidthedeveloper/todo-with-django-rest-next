import os

from django.conf import settings
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from dotenv import load_dotenv
from rest_framework import serializers

from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from .models import CustomUser, Todo, EmailConfirmationModel
from .token import account_activation_token

load_dotenv()


class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'name', 'date_joined', 'last_login', 'is_active']


class EmailConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmationModel
        fields = '__all__'

class EmailVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmationModel
        fields = ['uid','email_confirm_token']
        
    def validate(self, attrs):
        
        if attrs['uid'] is not None and attrs['email_confirm_token'] is not None:
            
            email_user = EmailConfirmationModel.objects.filter(uid=attrs['uid'], email_confirm_token=attrs['email_confirm_token']).exists()
        
            if not email_user:
                raise serializers.ValidationError({'non_field_errors': ['Token or uid is invalid!']})
            
            uid = force_str(urlsafe_base64_decode(attrs['uid']))
            user = CustomUser.objects.get(pk=uid)
            
            token_verified = account_activation_token.check_token(user, attrs['email_confirm_token'])
            
            if not token_verified:
                raise serializers.ValidationError({'non_field_errors': ['Invalid token!']})

        return attrs
        
        
    

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'confirm_password']

    def validate(self, data):
        user = CustomUser.objects.filter(email=data['email']).exists()
        
        if user:
            raise serializers.ValidationError({'email': 'User already exists with this email'})
        
        if len(data['password']) < 6:
            raise serializers.ValidationError({"password": "Password must be more than 6 characters."})

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        mail_subject = 'Activate your Todo Account'
        
        user = CustomUser.objects.create(
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        
        EmailConfirmationModel.objects.create(
            uid=uidb64,
            email_confirm_token=token
        )

        email_body = os.getenv("CLIENT_URL") + 'email-verify?uid=' + uidb64 + '&token=' + token

        send_mail(mail_subject, email_body, settings.EMAIL_HOST_USER, [validated_data['email'], ])
        

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = CustomUser.objects.get(email=data['email'], is_active=True)
            if not user.check_password(data['password']):
                raise serializers.ValidationError({'password': 'Email or password is incorrect'})
        except Exception:
            raise serializers.ValidationError({"password": "Email or password is incorrect"})
        return data


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
