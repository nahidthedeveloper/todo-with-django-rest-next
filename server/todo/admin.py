from django.contrib import admin

from .models import CustomUser, Todo, EmailConfirmationModel

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Todo)
admin.site.register(EmailConfirmationModel)
