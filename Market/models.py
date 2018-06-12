# Create your models here.
from django.db import models


class Stock(models.Model):
    symbol = models.CharField(max_length=30, unique=True)


class StockData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    time = models.DateTimeField()
    open = models.DecimalField(decimal_places=2, max_digits=7)
    high = models.DecimalField(decimal_places=2, max_digits=7)
    low = models.DecimalField(decimal_places=2, max_digits=7)
    close = models.DecimalField(decimal_places=2, max_digits=7)
    volume = models.DecimalField(decimal_places=0, max_digits=10)

    class Meta:
        unique_together = ('stock', 'time')
