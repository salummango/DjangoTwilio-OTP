from django.contrib import admin
from user.models import User
# Register your models here.
admin.site.register(User)

# your_app/admin.py
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.decorators.cache import never_cache

from .views import LoginUser

class CustomAdminSite(AdminSite):
    # Override the default login view with your custom LoginUser view
    @never_cache
    def login(self, request, extra_context=None):
        return LoginUser.as_view()(request)

# Replace 'your_app' with the name of your app
custom_admin_site = CustomAdminSite(name='custom-admin')
