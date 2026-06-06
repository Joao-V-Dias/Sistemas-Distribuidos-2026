from django.urls import path
from .views import get_aplicacoes, get_aplicacao, create_aplicacao, delete_aplicacao, update_aplicacao
from .views import get_registro_temperatura, create_registro_temperatura, update_registro_temperatura, delete_registro_temperatura, get_registros_temperatura

urlpatterns = [
    path('aplicacoes/', get_aplicacoes, name='get_aplicacoes'),
    path('aplicacoes/create', create_aplicacao, name='create_aplicacao'),
    path('aplicacoes/<str:pk>', get_aplicacao, name='get_aplicacao'),
    path('aplicacoes/update/<str:pk>', update_aplicacao, name='update_aplicacao'),
    path('aplicacoes/delete/<str:pk>', delete_aplicacao, name='delete_aplicacao'),

    path('registros-temperatura/', get_registros_temperatura,name='get_registros_temperatura'),
    path('registros-temperatura/create', create_registro_temperatura, name='create_registro_temperatura'),
    path('registros-temperatura/<str:pk>', get_registro_temperatura, name='get_registro_temperatura'),
    path('registros-temperatura/update/<str:pk>', update_registro_temperatura, name='update_registro_temperatura'),
    path('registros-temperatura/delete/<str:pk>', delete_registro_temperatura, name='delete_registro_temperatura'),
]