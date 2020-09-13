from config import * 



class Carro(db.Model): 
    # atributos do filme 
    id = db.Column(db.Integer, primary_key=True) 
    nome = db.Column(db.String(254)) 
    estilo = db.Column(db.String(254)) 
    ano = db.Column(db.String(254)) 
 
    # método para expressar o filme em forma de texto 
    def __str__(self): 
        return str(self.id)+") "+ self.nome + ", " +\
             self.estilo + ", " + self.ano
    
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "estilo": self.estilo,
            "ano": self.ano
        }

# teste 
if __name__ == "__main__": 
    # apagar o arquivo, se houver 
    if path.exists(arquivobd): 
        remove(arquivobd) 
 
    # criar tabelas 
    db.create_all() 
 
    # teste da classe Pessoa 
    carro1 = Carro(nome = "frontier", estilo = "caminhoneta", 
        ano = "2010") 
    carro2 = Carro(nome = "f-250", estilo = "caminhoneta", 
        ano = "2010")
    carro3 = Carro(nome = "jetta", estilo = "sedan", 
        ano = "2010")  

    
 
     # persistir 
    db.session.add(carro1) 
    db.session.add(carro2) 
    db.session.add(carro3)
    db.session.commit() 
 
    # exibir 
    print(carro1)
    print(carro2)
    print(carro3)
    print("")

    # exibir a pessoa no format json
    print(carro1.json())
    print(carro2.json())
    print(carro3.json())
