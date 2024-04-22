from flask import Flask
from flask_migrate import Migrate  # type: ignore
from src.routes.auth import auth_bp
from src.routes.user import user_bp
from src.routes.teams import teams_bp
from src.routes.statistics import statistics_bp
from src.routes.emergency import emergency_bp
from src.models import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import json

with open('./src/config.json') as f:
    data = json.load(f)

jwtSecret = data['jwtSecret']
postgresURI = data['postgresURI']

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = jwtSecret
jwt = JWTManager(app)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = postgresURI
db.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(emergency_bp)
app.register_blueprint(teams_bp)
app.register_blueprint(statistics_bp)


if __name__ == '__main__':
    app.run()

# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5433/emr'
# DELETE drop_tables_script.py after development
