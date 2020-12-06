from config import *
from modelo import Usuario, PedidoRealizado, Pedidos

@app.route("/")
def inicio():
    return 'Sistema de cadastro de pedidos de Compra e Venda. '+\
        '<a href="/listar_usuarios">Operação listar</a>'

@app.route("/listar_usuarios")
def listar_usuarios():
    usuarios = db.session.query(Usuario).all()
    usuario_em_json = [ x.json() for x in usuarios ]
    resposta = jsonify(usuario_em_json)
    print(resposta)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
@app.route("/incluir_usuario", methods=['post'])
def incluir_usuario():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try: 
      nova = Usuario(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e: 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
@app.route("/excluir_usuario/<int:pessoa_id>", methods=['DELETE'])
def excluir_usuario(usuario_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Usuario.query.filter(Usuario.id == usuario_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_pedidos_realizados")
def listar_pedidos_realizados():
    pedidos_realizados = db.session.query(PedidoRealizado).all()
    lista_jsons = [ x.json() for x in pedidos_realizados]
    respostaPedidos = jsonify(lista_jsons)
    print(pedidos_realizados[0].id)
    respostaPedidos.headers.add("Access-Control-Allow-Origin", "*")
    return respostaPedidos


@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "PedidoRealizado":
      dados = db.session.query(PedidoRealizado).all()
    elif classe == "Usuario":
      dados = db.session.query(Usuario).all()
    elif classe == "Pedidos":
      dados = db.session.query(Pedidos).all()
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_pedidos_realizados", methods=['post'])
def incluir_exame_realizado():

    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try: 
      nova = PedidoRealizado(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e: 

      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
app.run(debug=True)