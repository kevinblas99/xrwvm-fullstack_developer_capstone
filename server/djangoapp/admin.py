from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.
class CarsAdmin(admin.ModelAdmin):
    inline = [CarModelInline]
# CarModelInline class
class CarModelInline(admin.StackedInLine):
    model = CarModel
# CarModelAdmin class

# CarMakeAdmin class with CarModelInline

# Register models here
admin.site.register(CarMake)
admin.site.register(CarModel)
