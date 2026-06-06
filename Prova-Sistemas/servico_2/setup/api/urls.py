from django.urls import path
from .views import get_fornecedor, get_fornecedores, update_fornecedor, delete_fornecedor, create_fornecedor

urlpatterns = [
    path('fornecedores/', get_fornecedores, name='get_fornecedores'),
    path('fornecedores/create', create_fornecedor, name='create_fornecedor'),
    path('fornecedores/<str:pk>', get_fornecedor, name='get_fornecedor'),
    path('fornecedores/update/<str:pk>', update_fornecedor, name='update_fornecedor'),
    path('fornecedores/delete/<str:pk>', delete_fornecedor, name='delete_fornecedor'),
]