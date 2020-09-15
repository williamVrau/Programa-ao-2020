from config import *

class Carro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    modelo = db.Column(db.String(254))
    ano = db.Column(db.String(254))
    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.modelo + ", " + self.ano
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "modelo": self.modelo,
            "ano": self.ano
        }

if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    c1 = Carro(nome = "S-10", modelo = "caminhonete", 
        ano = "09/2010")
    c2 = Carro(nome = "Parati", modelo = "Wagon", 
        ano = "02/2006")        
    db.session.add(c1)
    db.session.add(c2)
    db.session.commit()
    print(c2)
    print(c2.json())