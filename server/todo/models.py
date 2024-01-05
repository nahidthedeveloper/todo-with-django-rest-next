# import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from .manage import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None

    email = models.EmailField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    password = models.CharField()
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# class EmailConfirmationModel(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
