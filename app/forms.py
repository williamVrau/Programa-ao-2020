from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField ,TextField, TextAreaField, SubmitField, PasswordField, SelectField
from wtforms.fields.html5 import DateField
from wtforms.validators import InputRequired, Email, EqualTo

class CadastrarUsuarioForm(FlaskForm):
    email = StringField("E-mail", validators=[InputRequired(message="Campo obrigatório."),
                                              Email(message="Insira um endereço de e-mail válido, usando '@'.")])
    nome = StringField("Nome do usuário", validators=[InputRequired(message="Campo obrigatório.")])
    data_nascimento = DateField("Data de nascimento", validators=[InputRequired(message="Campo obrigatório.")])
    senha = PasswordField("Senha", validators=[InputRequired(message="Campo obrigatório.")])
    senha_verificadora = PasswordField("Digite novamente sua senha",validators=[InputRequired(message="Campo obrigatório"),
                                                                                EqualTo('senha')])
    submit = SubmitField("confirmar")

class LogarUsuarioForm(FlaskForm):
    email = StringField("Email do usuário", validators=[InputRequired(message="Campo obrigatório."),Email(message="Insira um endereço de e-mail válido, usando '@'.")])
    senha = PasswordField("Senha", validators=[InputRequired(message="Campo obrigatório.")])
    submit = SubmitField("Logar")