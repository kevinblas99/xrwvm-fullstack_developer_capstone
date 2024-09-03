# Uncomment the following imports before adding the Model code

from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'Suv'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('EV', 'Ev'),
        ('HYBRID', 'Hybrid'),
        ('HATCHBACK', 'Hatchback'),
        ('LUXURY', 'Luxury'),
        ('SPORTS', 'Sports'),
        ('CONVERTIBLE', 'Convertible'),
    ]
    CAR_COLORS = [
        ('BLACK','WHITE','GRAY','RED','BLUE')
    ]
    car_type = models.CharField(max_length=30, choices=CAR_TYPES, default='SEDAN')
    car_color = models.CharField(max_length=10, choices=CAR_COLORS, default="BLACK")
    year = models.IntegerField(default=2024,
        validators=[
            MaxValueValidator(2024),
            MinValueValidator(2016)
        ])

    def __str__(self):
        return self.name


admin.site.register(CarMake)
admin.site.register(CarModel)