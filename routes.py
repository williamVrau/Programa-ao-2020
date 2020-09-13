from config import * 
from modelo import Carro
 
@app.route("/") 
def main(): 
    return 'Sistema de cadastro de carros.' + '<a href="/listar_carros">Operação listar</a>' 
 
@app.route("/listar_carros") 
def listar_carros(): 
    # obter os carros do cadastro 
    carros = db.session.query(Carro).all() 
    # fornecer a carros de filmes para a página que exibe as pessoas 
    carros_em_json = [ carro.json() for carro in carros ]
    resposta = jsonify(carros_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta    
