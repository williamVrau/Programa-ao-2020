$(function() { 
    function exibir_carros() {
        $.ajax({
            url: 'http://localhost:5000/listar_carros',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (carros) {
            $('#corpoTabelaCarros').empty();
            mostrar_conteudo("tabelaCarros");      
            for (var i in carros) { 
                lin = '<tr id="linha_'+carros[i].id+'">' + 
                '<td>' + carros[i].nome + '</td>' + 
                '<td>' + carros[i].modelo + '</td>' + 
                '<td>' + carros[i].ano + '</td>' + 
                '<td><a href=# id="excluir_' + carros[i].id + '" ' + 
                  'class="excluir_carro"><img src="img/excluir.png" '+
                  'alt="Excluir carro" title="Excluir carro"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaCarros').append(lin);
            }
        }
    }
    function mostrar_conteudo(identificador) {
        $("#tabelaCarros").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }
    $(document).on("click", "#linkListarCarros", function() {
        exibir_carros();
    });
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });
    $(document).on("click", "#btIncluirCarros", function() {
        nome = $("#campoNome").val();
        modelo = $("#campoModelo").val();
        ano = $("#campoAno").val();
        var dados = JSON.stringify({ nome: nome, modelo: modelo, ano: ano });
        $.ajax({
            url: 'http://localhost:5000/incluir_carros',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: carroIncluido, 
            error: erroAoIncluir
        });
        function carroIncluido (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Carro incluído com sucesso!");
                $("#campoNome").val("");
                $("#campoModelo").val("");
                $("#campoAno").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });
    $('#modalIncluirCarros').on('hide.bs.modal', function (e) {
        if (! $("#tabelaCarros").hasClass('invisible')) {
            exibir_carros();
        }
    });
    mostrar_conteudo("conteudoInicial");
    $(document).on("click", ".excluir_carro", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_carro = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_carro/'+id_carro,
            type: 'DELETE', 
            dataType: 'json', 
            success: carroExcluido, 
            error: erroAoExcluir
        });
        function carroExcluido (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_carro).fadeOut(1000, function(){

                    alert("Carro removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    
});