from config import *
from modelo import Carro

@app.route("/")
def inicio():
    return 'Sistema de cadastro de Carros. '+\
        '<a href="/listar_carros">Operação listar</a>'

@app.route("/listar_carros")
def listar_carros():
    carros = db.session.query(Carro).all()
    carros_em_json = [ x.json() for x in carros ]
    resposta = jsonify(carros_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_carros", methods=['post'])
def incluir_carros():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try:
      nova = Carro(**dados)
      db.session.add(nova)
      db.session.commit() 
    except Exception as e: 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_carro/<int:pessoa_id>", methods=['DELETE'])
def excluir_pessoa(carro_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Carro.query.filter(Carro.id == carro_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)
