# Generated by Django 3.0.6 on 2020-06-01 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_auto_20200527_1725'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('username', models.EmailField(max_length=254, unique=True)),
            ],
        ),
    ]
