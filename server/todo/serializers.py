from rest_framework import serializers

from server.todo import models
from .models import User


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
