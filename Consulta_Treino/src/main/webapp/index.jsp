<%-- 
    Document   : index
    Created on : 29 de mar. de 2026, 19:26:52
    Author     : Joao Dias
--%>

<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portal Bancário - Consulta de Risco</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { background-color: #f8f9fa; }
            .card { margin-top: 100px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        </style>
    </head>
    <body>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card p-4">
                    <h3 class="text-center mb-4">Consulta de Crédito</h3>
                    <form action="ConsultaCreditoServlet" method="POST">
                        <div class="mb-3">
                            <label for="cpf" class="form-label">Digite o CPF do Cliente:</label>
                            <input type="text" name="cpf" id="cpf" class="form-control" placeholder="000.000.000-00" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Consultar Servidor Central</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
