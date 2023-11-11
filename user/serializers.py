from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    userImage = serializers.ImageField(required=True)
    class Meta:
        model = User  
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'phoneNo','userImage']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.password = make_password(password)  # Using make_password to hash the password
        instance.save()
        return instance


