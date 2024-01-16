import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from .manage import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None

    email = models.EmailField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    password = models.CharField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Todo(models.Model):
    STATUS_CHOICES = (
        ("in_progress", "In Progress"),
        ("done", "Done"),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.TextField(max_length=100, null=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="in_progress")

    def __str__(self):
        return self.title


class EmailConfirmationModel(models.Model):
    uid = models.CharField(max_length=55)
    created_at = models.DateTimeField(auto_now_add=True)
    email_confirm_token = models.CharField(max_length=255)

# test commit