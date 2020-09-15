$(function() { 
    

    function exibir_carros() {
        $.ajax({
            url: 'http://localhost:5000/listar_pessoas',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (carros) {
            $('#corpoTabelaCarros').empty();
            mostrar_conteudo("tabelaCarross");      
            for (var i in carros) { 
                lin = '<tr id="linha_'+carros[i].id+'">' + 
                '<td>' + carros[i].nome + '</td>' + 
                '<td>' + carros[i].modelo + '</td>' + 
                '<td>' + carros[i].ano + '</td>' + 
                '<td><a href=# id="excluir_' + carros[i].id + '" ' + 
                  'class="excluir_pessoa"><img src="img/excluir.png"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaCarros').append(lin);
            }
        }
    }
    function mostrar_conteudo(identificador) {
        $("#tabelaPessoas").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }
    $(document).on("click", "#linkListarPessoas", function() {
        exibir_carros();
    });
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirPessoa", function() {
        nome = $("#campoNome").val();
        modelo = $("#campoModelo").val();
        ano = $("#campoAno").val();
        var dados = JSON.stringify({ nome: nome, modelo: modelo, ano: ano });
        $.ajax({
            url: 'http://localhost:5000/incluir_pessoa',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: carroIncluida, 
            error: erroAoIncluir
        });
        function carroIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Pessoa incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoModelo").val("");
                $("#campoAno").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    $('#modalIncluirPessoa').on('hide.bs.modal', function (e) {
        if (! $("#tabelaPessoas").hasClass('invisible')) {
            exibir_pessoas();
        }
    });
    mostrar_conteudo("conteudoInicial");
    $(document).on("click", ".excluir_carro", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_pessoa = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_pessoa/'+id_pessoa,
            type: 'DELETE', 
            dataType: 'json', 
            success: carroExcluida, 
            error: erroAoExcluir
        });
        function carroExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_pessoa).fadeOut(1000, function(){
                    alert("Pessoa removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {

            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    
});