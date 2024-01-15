from django.urls import path
from .views import *

urlpatterns = [
    path('', HomeView.as_view(), name='API List'),
    path('signup/', RegisterUser.as_view(), name='signup'),
    path('login/', LoginUser.as_view(), name='login_profile'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('todos/', TodoView.as_view(), name='todo_view'),
    path('todos/<int:todo_id>', TodoSingle.as_view(), name='todo_single'),
]
