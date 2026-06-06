from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Aplicacao, RegistroTemperatura
from .serializer import AplicacaoSerializer, RegistroTemperaturaSerializer

@api_view(['GET'])
def get_aplicacoes(request):
    aplicacoes = Aplicacao.objects.all()
    serializer = AplicacaoSerializer(aplicacoes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_aplicacao(request):
    serializer = AplicacaoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def get_aplicacao(request, pk):
    try:
        aplicacao = Aplicacao.objects.get(pk=pk)
    except Aplicacao.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = AplicacaoSerializer(aplicacao)
    return Response(serializer.data)


@api_view(['PUT'])
def update_aplicacao(request, pk):
    try:
        aplicacao = Aplicacao.objects.get(pk=pk)
    except Aplicacao.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = AplicacaoSerializer(
        aplicacao,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['DELETE'])
def delete_aplicacao(request, pk):
    try:
        aplicacao = Aplicacao.objects.get(pk=pk)
    except Aplicacao.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    aplicacao.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(['GET'])
def get_registros_temperatura(request):
    registros = RegistroTemperatura.objects.all()
    serializer = RegistroTemperaturaSerializer(
        registros,
        many=True
    )
    return Response(serializer.data)


@api_view(['POST'])
def create_registro_temperatura(request):
    serializer = RegistroTemperaturaSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def get_registro_temperatura(request, pk):
    try:
        registro = RegistroTemperatura.objects.get(pk=pk)

    except RegistroTemperatura.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = RegistroTemperaturaSerializer(
        registro
    )

    return Response(serializer.data)


@api_view(['PUT'])
def update_registro_temperatura(request, pk):
    try:
        registro = RegistroTemperatura.objects.get(pk=pk)

    except RegistroTemperatura.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = RegistroTemperaturaSerializer(
        registro,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['DELETE'])
def delete_registro_temperatura(request, pk):
    try:
        registro = RegistroTemperatura.objects.get(pk=pk)

    except RegistroTemperatura.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    registro.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT
    )