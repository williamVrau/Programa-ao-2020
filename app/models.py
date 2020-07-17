from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class UserModel(UserMixin, db.Model):
    email = db.Column(db.String(120), primary_key=True)
    nome = db.Column(db.String(64), index=True)
    data_nascimento = db.Column(db.Date, index=True)
    senha_hash = db.Column(db.String(128))
    
    def __init__(self, email, nome, data_nascimento, caminho_da_foto, senha):
        self.nome = nome
        self.email = email
        self.data_nascimento = data_nascimento
        self.cripto_senha(senha)

    def get_id(self):
        return self.email

    def cripto_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)