from flask import Flask
from app import db
from flask_cors import CORS
from src.config import SQLALCHEMY_DATABASE_URI
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "jwt-emergency-management-and-response-system"
jwt = JWTManager(app)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

with app.app_context():
    db.drop_all()