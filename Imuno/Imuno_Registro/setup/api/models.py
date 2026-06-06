from django.db import models

class Aplicacao(models.Model):
    paciente_id = models.BigIntegerField()
    lote_id = models.BigIntegerField()
    usuario_id = models.BigIntegerField()
    dose = models.IntegerField()
    observacoes = models.TextField(blank=True, null=True)
    aplicado_em = models.DateTimeField()

    def __str__(self):
        return f"Aplicação {self.id}"

class RegistroTemperatura(models.Model):
    freezer_id = models.BigIntegerField()
    temperatura = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )
    dentro_faixa = models.BooleanField()
    registrado_em = models.DateTimeField()

    def __str__(self):
        return f"Registro {self.id}"