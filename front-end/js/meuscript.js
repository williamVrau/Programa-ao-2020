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

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: 'http://localhost:5000/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: carregar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            // esvaziar o combo
            $('#'+combo_id).empty();
            // mostra ícone carregando...
            $('#loading_'+combo_id).removeClass('d-none');
            // percorrer a lista de dados
            for (var i in dados) { //i vale a posição no vetor
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome));
            }
            // espera um pouco, para ver o ícone "carregando"
            setTimeout(() => { 
                $('#loading_'+combo_id).addClass('d-none');
             }, 1000);
        }
    }

    $('#modalIncluirPedidoRealizado').on('shown.bs.modal', function (e) {
        // carregar as listas de pessoas e
        carregarCombo("campoUsuarioId", "Usuario");
        carregarCombo("campoPedidoId", "Pedidos");
    })

     // incluir exe realizado
     $(document).on("click", "#btIncluirPedidoRealizado", function() {
        //pegar dados da tela
        data = $("#campoData").val();
        resultado = $("#campoResultado").val();
        usuario_id = $("#campoUsuarioId").val();
        pedido_id = $("#campoPedidoId").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ data: data, resultado: resultado, usuario_id: usuario_id, pedido_id: pedido_id });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_pedidos_realizado',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: dadosIncluidos, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Dados incluídos com sucesso!");
                // limpar os campos
                $("#campoData").val("");
                $("#campoResultado").val("");
                $("#campoUsuarioId").val("");
                $("#campoPedidoId").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });
});