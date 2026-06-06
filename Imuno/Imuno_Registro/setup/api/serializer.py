from rest_framework import serializers
from .models import Aplicacao

class AplicacaoSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    paciente_id = serializers.IntegerField()
    lote_id = serializers.IntegerField()
    usuario_id = serializers.IntegerField()
    dose = serializers.IntegerField()
    observacoes = serializers.CharField(
        required=False,
        allow_blank=True
    )
    aplicado_em = serializers.DateTimeField()

    def create(self, validated_data):
        return Aplicacao.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    
class RegistroTemperaturaSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    freezer_id = serializers.IntegerField()
    temperatura = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        required=False
    )
    dentro_faixa = serializers.BooleanField()
    registrado_em = serializers.DateTimeField()

    def create(self, validated_data):
        return RegistroTemperatura.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance