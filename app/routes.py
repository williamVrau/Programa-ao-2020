from app import app, login
from flask import render_template, redirect, url_for
from app.forms import CadastrarUsuarioForm, LogarUsuarioForm
from app import db, login
from app.models import UserModel
from flask_login import logout_user, login_required, login_user, current_user
from app import config
from werkzeug.security import generate_password_hash, check_password_hash

@app.route("/")
@app.route("/index",methods=['post','get'])
def executar_index():
    return render_template("index.html",title="Index")

@app.route("/cadastro", methods=['get', 'post'])
def cadastrar_usuario():
    form = CadastrarUsuarioForm()
    if form.validate_on_submit():
        usuario_cadastrado = UserModel(form.email.data,form.nome.data,form.data_nascimento.data,"",form.senha.data)
        db.session.add(usuario_cadastrado)
        db.session.commit()
        login_user(usuario_cadastrado)
        return redirect("/index")
    return render_template('cadastro_usuario.html', form=form)

@app.route('/logar', methods=['get', 'post'])
def logar_usuario():
    form = LogarUsuarioForm()
    if form.validate_on_submit():
        usuario = UserModel.query.filter_by(email=form.email.data).first()
        if usuario is not None:
            if usuario.verificar_senha(form.senha.data):
                login_user(usuario)
                return redirect("/index")
    else:
        print(form.email)
    return render_template("logar.html", form=form)


@app.route('/logout',methods=['get','post'])
@login_required
def deslogar():
    logout_user()
    return redirect("/index")

@login.user_loader
def load_user(email):
    return UserModel.query.filter_by(email=email).first()