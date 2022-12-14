# Generated by Django 4.1.1 on 2022-09-15 16:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=256)),
                ('type', models.CharField(choices=[('FUNDACJA', 'fundacja'), ('ORGANIZACJA', 'organizacja pozarządowa'), ('ZBIORKA', 'zbiórka lokalna')], default='FUNDACJA', max_length=20)),
                ('categories', models.ManyToManyField(to='donation.category')),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveSmallIntegerField()),
                ('address', models.CharField(max_length=128)),
                ('phone_number', models.CharField(max_length=12)),
                ('city', models.CharField(max_length=128)),
                ('zip_code', models.CharField(max_length=5)),
                ('pick_up_date', models.DateField()),
                ('pick_up_time', models.TimeField()),
                ('pick_up_comment', models.TextField()),
                ('categories', models.ManyToManyField(to='donation.category')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='donation.institution')),
                ('user', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
