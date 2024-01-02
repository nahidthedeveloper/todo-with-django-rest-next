from django.urls import path
from .views import *

urlpatterns = [
    path('', TodoList.as_view(), name='API List'),
    path('signup/', RegisterUser.as_view(), name='signup'),
    path('login/', LoginUser.as_view(), name='login_profile'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
]
