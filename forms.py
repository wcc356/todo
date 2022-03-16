from turtle import title
from wsgiref.validate import validator
from wtforms import Form, StringField
from wtforms.validators import DataRequired

class TaskForm(Form):
    title = StringField('title', validators=[DataRequired()])