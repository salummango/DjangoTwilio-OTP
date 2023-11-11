from django.shortcuts import redirect,render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth.hashers import make_password
from user.models import User
from rest_framework.parsers import MultiPartParser
from django.urls import reverse
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

# Add necessary imports for sending OTP
import random
from twilio.rest import Client
from django.conf import settings

# Create your views here.


# ...

class RegisterUser(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        # Redirect to the login page
        return redirect(reverse('login'))
    
    def get(self, request):
        # Handle GET requests for login page
        # Return the HTML template for the login page
        return render(request, 'user/registration.html')


class LoginUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Finding user by using email
        user = authenticate(request, email=email, password=password)
        
        if user is None:
            raise AuthenticationFailed('User not found')
        
        # Generate OTP
        otp = self.generate_otp()

        # Save OTP to user's session or database for later verification
        request.session['otp'] = otp

        # Send OTP to the user's phone
        self.send_otp_to_phone(user.phoneNo, otp)

        # Render the OTP verification template
        return render(request, 'user/login.html', {'email': email})

    def generate_otp(self):
        return str(random.randint(100000, 999999))

    def send_otp_to_phone(self, phoneNo, otp):
        # Initialize the Twilio client with credentials from settings
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        try:
            # Send OTP via SMS
            message = client.messages.create(
                body=f'Your OTP is: {otp}',
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phoneNo
            )
            print(f'Successfully sent OTP to {phoneNo}. Message SID: {message.sid}')
        except Exception as e:
            # Handle any errors that may occur during sending the SMS
            print(f'Error sending OTP to {phoneNo}: {e}')

    def get(self, request):
        # Handle GET requests for login page
        # Return the HTML template for the login page
        return render(request, 'user/login.html')

   
# class VerifyOTP(APIView):
#     def post(self, request):
#         entered_otp = request.data.get('otp')
#         saved_otp = request.session.get('otp')

#         if entered_otp == saved_otp:
#             # OTP is correct, log in the user
#             email = request.data.get('email')
#             user = User.objects.get(email=email)
#             payload = {
#                 'id': user.id,
#                 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
#                 'iat': datetime.datetime.utcnow()
#             }
#             token = jwt.encode(payload, 'secrete', algorithm='HS256')
#             response = JsonResponse({'jwt': token})
#             response.set_cookie('jwt', token, httponly=True)
#             return response
#         else:
#             return JsonResponse({'detail': 'Incorrect OTP'}, status=400)

# views.py



# class VerifyOTP(APIView):
#     def post(self, request):
#         entered_otp = request.data.get('otp')
#         saved_otp = request.session.get('otp')
#         email = request.data.get('email')

#         # Fetch the user using the provided email
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return JsonResponse({'detail': 'User not found'}, status=400)

#         if entered_otp == saved_otp:
#             # OTP is correct, log in the user
#             payload = {
#                 'id': user.id,
#                 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
#                 'iat': datetime.datetime.utcnow()
#             }
#             token = jwt.encode(payload, 'secrete', algorithm='HS256')
#             response = JsonResponse({'jwt': token})
#             response.set_cookie('jwt', token, httponly=True)
#             return response
#         else:
#             return JsonResponse({'detail': 'Incorrect OTP'}, status=400) 

# views.py

from user.models import User  # Make sure to import your User model

class VerifyOTP(APIView):
    def post(self, request):
        entered_otp = request.data.get('otp')
        saved_otp = request.session.get('otp')
        email = request.data.get('email')

        # Debug output
        print(f"Received email for OTP verification: {email}")

        # Fetch the user using the provided email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User not found'}, status=400)

        if entered_otp == saved_otp:
            # OTP is correct, log in the user
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secrete', algorithm='HS256')
            response = JsonResponse({'jwt': token})
            response.set_cookie('jwt', token, httponly=True)
            return response
        else:
            return JsonResponse({'detail': 'Incorrect OTP'}, status=400)







class LogoutUser(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Successfully logged out'
        }
        return redirect('/')
