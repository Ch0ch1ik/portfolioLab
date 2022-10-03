# Generated by Django 4.1.1 on 2022-10-03 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0006_rename_collect_date_donation_is_taken'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donation',
            name='collected',
        ),
        migrations.AddField(
            model_name='donation',
            name='collect_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='donation',
            name='is_taken',
            field=models.BooleanField(default=False),
        ),
    ]
