from rest_framework import serializers
from .models import Fornecedor

class FornecedorSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    razao_social = serializers.CharField()
    nome_fantasia = serializers.CharField()
    cnpj = serializers.CharField()
    telefone = serializers.CharField(required=False, allow_blank=True)
    email = serializers.CharField(required=False, allow_blank=True)
    endereco = serializers.CharField(required=False, allow_blank=True)
    cidade = serializers.CharField(required=False, allow_blank=True)
    estado = serializers.CharField(required=False, allow_blank=True)
    ativo = serializers.BooleanField()

    # 🔥 CREATE (obrigatório no Mongo)
    def create(self, validated_data):
        return Fornecedor.objects.create(**validated_data)

    # 🔥 UPDATE (obrigatório também)
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance