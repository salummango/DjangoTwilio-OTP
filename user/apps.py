# user/apps.py
from django.apps import AppConfig

class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'

    def ready(self):
        # Import the custom admin site and override the default admin site
        from .admin import custom_admin_site
        self.module.ADMIN_SITE = custom_admin_site
