<%-- 
    Document   : resultado
    Created on : 29 de mar. de 2026, 19:28:39
    Author     : Joao Dias
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado da Análise</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6 text-center">
            <div class="alert ${msgResultado.contains('NEGADO') ? 'alert-danger' : 'alert-success'} shadow">
                <h4 class="alert-heading">Resultado da Consulta</h4>
                <hr>
                <%-- Uso do JSTL para exibir a variável setada no Servlet --%>
                <p class="mb-0 fs-5">
                    <c:out value="${msgResultado}" />
                </p>
            </div>
            
            <a href="index.jsp" class="btn btn-outline-secondary mt-3">Fazer nova consulta</a>
        </div>
    </div>
</div>

</body>
</html>
