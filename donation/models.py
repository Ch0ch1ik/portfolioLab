from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64)


class Institution(models.Model):
    TYPES_CHOICES = [
        ('FUNDACJA', 'fundacja'),
        ('ORGANIZACJA', 'organizacja pozarządowa'),
        ('ZBIORKA', 'zbiórka lokalna')
    ]
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=256)
    type = models.CharField(choices=TYPES_CHOICES, default='FUNDACJA', max_length=20)
    categories = models.ManyToManyField(Category)


class Donation(models.Model):
    quantity = models.PositiveSmallIntegerField()
    categories = models.ManyToManyField(Category)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    address = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=12)
    city = models.CharField(max_length=128)
    zip_code = models.CharField(max_length=5)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    pick_up_comment = models.TextField()
    user = models.ForeignKey(User, blank=True, default=None, on_delete=models.CASCADE)
