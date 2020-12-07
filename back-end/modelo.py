from config import *
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    email = db.Column(db.String(254))
    def __str__(self):
        return self.nome + "[id="+str(self.id)+ "], " +\
            self.email
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
        }
class Pedidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    desejo = db.Column(db.String(254)) 
    valor = db.Column(db.String(254)) 
    def __str__(self):
        return f"{self.desejo} [{self.id}], ({self.valor})"  
    def json(self):
        return {
            "id":self.id,
            "desejo":self.desejo,
            "valor":self.valor
        }   
class PedidoRealizado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(254))
    resultado = db.Column(db.String(254))
    usuario_id = db.Column(db.Integer, db.ForeignKey(Usuario.id), nullable=False)
    usuario = db.relationship("Usuario")
    pedido_id =  db.Column(db.Integer, db.ForeignKey(Pedidos.id), nullable=False)
    pedido = db.relationship("Pedidos")
    def __str__(self):
        return f"{self.data}, {self.resultado}, " + \
            f"{self.usuario}, {self.pedido}"
    def json(self):
        return {
            "id":self.id,
            "data":self.data,
            "resultado":self.resultado,
            "usuario_id":self.usuario_id,
            "usuario":self.usuario.json(),
            "pedido_id":self.pedido_id,
            "pedido":self.pedido.json()
        }
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    db.create_all()
    p1 = Usuario(nome = "João da Silva", email = "josilva@gmail.com",)
    p2 = Usuario(nome = "Maria Oliveira", email = "molive@gmail.com",)        
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    celta = Pedidos(desejo="Compra celta", valor="10000 a 15000")
    gol = Pedidos(desejo="Vender Gol", valor="Valor iniciar de 10000")
    db.session.add(celta)
    db.session.add(gol)
    db.session.commit()
    e1 = PedidoRealizado(data="02/02/2020", pedido=celta, 
        resultado="comprado", usuario=p1)
    e2 = PedidoRealizado(data="02/02/2020", pedido=celta, 
        resultado="comprado", usuario=p2)
    db.session.add(e1)
    db.session.add(e2)
    db.session.commit()
    print(f"pedido realizado: {e1}")
    print(f"pedido realizado em json: {e1.json()}")