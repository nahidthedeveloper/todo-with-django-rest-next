from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.is_active = False
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields['is_staff'] = True
        extra_fields['is_superuser'] = True
        extra_fields['is_active'] = True

        if extra_fields.get('is_staff') is not True:
            raise ValueError('The super user must have is_staff=True.')
        if extra_fields.get('is_active') is not True:
            raise ValueError('The super user must have is_active=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('The super user must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)
