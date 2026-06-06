from django.urls import path
from .views import get_donos, create_dono, dono_detail, get_pets, create_pet, pet_detail

urlpatterns = [
    path('fornecedores/', get_fornecedores, name='get_fornecedores'),
    path('fornecedores/create', create_fornecedor, name='create_fornecedor'),
    path('fornecedores/<int:pk>', get_fornecedor, name='get_fornecedor'),
    path('fornecedores/update/<int:pk>', update_fornecedor, name='update_fornecedor'),
    path('fornecedores/delete/<int:pk>', delete_fornecedor, name='delete_fornecedor'),
]