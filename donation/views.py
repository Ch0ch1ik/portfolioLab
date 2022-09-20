from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View

from donation.models import Donation, Institution


# Create your views here.
class LandingPage(View):

    def get(self, request):
        bags_count = 0
        donations = Donation.objects.all()
        supported_orgs = len(donations.values('institution_id').distinct())
        for donation in donations:
            bags_count += donation.quantity
        fundations = Institution.objects.all().filter(type='FUNDACJA')
        organisations = Institution.objects.all().filter(type='ORGANIZACJA')
        fundraisors = Institution.objects.all().filter(type='ZBIORKA')
        return render(request, 'index.html',
                      {'bags_count': bags_count, 'supported_orgs': supported_orgs, 'fundations': fundations,
                       'organisations': organisations, 'fundraisors': fundraisors})


class Login(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('landing_page')
        else:
            return redirect('register')


class Register(View):
    def get(self, request):
        return render(request, 'register.html')

    def post(self, request):
        first_name = request.POST['name']
        last_name = request.POST['surname']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']
        if password == password2 and first_name and last_name and email and password:
            User.objects.create_user(username=email, email=email, first_name=first_name, last_name=last_name,
                                     password=password)
            return redirect('login')


class AddDonation(View):
    def get(self, request):
        return render(request, 'form.html')


class Confirmation(View):
    def get(self, request):
        return render(request, 'form-confirmation.html')


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect('landing_page')