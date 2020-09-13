# importações 
from flask import Flask, jsonify 
from flask_sqlalchemy import SQLAlchemy 
import json
from os import path,remove
 
 
# configurações 
app = Flask(__name__) 

# caminho do arquivo de banco de dados 
caminho = path.dirname(path.abspath(__file__)) 
arquivobd = path.join(caminho, 'carros.db') 

# sqlalchemy 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + arquivobd 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings 
db = SQLAlchemy(app)
