from rest_framework import serializers

from .models import CustomUser, Todo, EmailConfirmationModel


class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'name', 'date_joined', 'last_login', 'is_active']


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'confirm_password']

    def validate(self, data):
        if len(data['password']) < 6:
            raise serializers.ValidationError({"password": "Password must be more than 6 characters."})

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data


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


class EmailConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmationModel
        fields = '__all__'
