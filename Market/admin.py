# Register your models here.
from django.contrib import admin

from Market.models import Stock, StockData


@admin.register(Stock, StockData)
class StockAdmin(admin.ModelAdmin):
    pass
