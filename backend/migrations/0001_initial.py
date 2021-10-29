# Generated by Django 3.0.3 on 2020-02-17 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='vehicle',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('make', models.CharField(max_length=30, verbose_name='manufacturer of the vehicle')),
                ('model', models.CharField(max_length=100, verbose_name='vehicle model')),
                ('year', models.DateField(verbose_name='model year or year of manufacture')),
                ('color', models.CharField(max_length=30, verbose_name='color of the vehicle')),
                ('vin', models.CharField(max_length=30, unique=True, verbose_name='vehicle VIN')),
            ],
        ),
    ]
