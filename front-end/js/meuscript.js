$(function() {
    function exibir_usuarios() {
        $.ajax({
            url: 'http://localhost:5000/listar_usuarios',
            method: 'GET',
            dataType: 'json',
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (usuarios) {
            $('#corpoTabelaUsuarios').empty();
            mostrar_conteudo("cadastroUsuarios");      
            for (var i in usuarios) {
                lin = '<tr id="linha_'+usuarios[i].id+'">' + 
                '<td>' + usuarios[i].nome + '</td>' + 
                '<td>' + usuarios[i].email + '</td>' + 
                '<td><a href=# id="excluir_' + usuarios[i].id + '" ' + 
                  'class="excluir_usuarios"><img src="img/excluir.png" '+
                  'alt="Excluir usuarios" title="Excluir usuario"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaUsuarios').append(lin);
            }
        }
    }
    function mostrar_conteudo(identificador) {
        $("#cadastroUsuarios").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#cadastroPedidosRealizados").addClass('d-none');
        $("#"+identificador).removeClass('d-none');      
    }
    $(document).on("click", "#linkListarUsuarios", function() {
        exibir_usuarios();
    });
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });
    $(document).on("click", "#btIncluirUsuario", function() {
        nome = $("#campoNome").val();
        email = $("#campoEmail").val();
        var dados = JSON.stringify({ nome: nome, email: email});
        $.ajax({
            url: 'http://localhost:5000/incluir_usuario',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', 
            data: dados, 
            success: usuarioIncluida, 
            error: erroAoIncluir
        });
        function usuarioIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Pessoa incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoEmail").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });
    $('#modalIncluirUsuario').on('hide.bs.modal', function (e) {
        if (! $("#cadastroUsuarios").hasClass('d-none')) {
            exibir_usuarios();
        }
    });
    mostrar_conteudo("conteudoInicial");
    $(document).on("click", ".excluir_usuario", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_usuario = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_usuario/'+id_usuario,
            type: 'DELETE',
            dataType: 'json', 
            success: usuarioExcluida,
            error: erroAoExcluir
        });
        function usuarioExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_usuario).fadeOut(1000, function(){
                    alert("Pessoa removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    function exibir_pedidos_realizados() {
        $.ajax({
            url: 'http://localhost:5000/listar_pedidos_realizados',
            method: 'GET',
            dataType: 'json', 
            success: listarPedidos, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listarPedidos (pedidos_realizados) {
            $('#corpoTabelaPedidosRealizados').empty();
            mostrar_conteudo("cadastroPedidosRealizados");      
            for (var i in pedidos_realizados) { 
                lin = '<tr id="linha_pedido_realizado_'+pedidos_realizados[i].id+'">' + 
                '<td>' + pedidos_realizados[i].data + '</td>' + 
                '<td>' + pedidos_realizados[i].resultado + '</td>' + 
                '<td>' + pedidos_realizados[i].usuario.nome + '</td>' + 
                '<td>' + pedidos_realizados[i].usuario.email + '</td>' + 
                '<td>' + pedidos_realizados[i].pedidos.desejo + '</td>' + 
                '<td>' + pedidos_realizados[i].pedidos.valor + '</td>' + 
                '<td><a href=# id="excluir_pedido_realizado_' + pedidos_realizados[i].id + '" ' + 
                  'class="excluir_pedido_realizado"><img src="img/excluir.png" '+
                  'alt="Excluir pedido realizado" title="Excluir pedido realizado"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaPedidosRealizados').append(lin);
            }
        }   
    }
    $(document).on("click", "#linkListarPedidosRealizados", function() {
        exibir_pedidos_realizados();
    });
});