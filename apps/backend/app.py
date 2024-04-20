from flask import Flask
from flask_migrate import Migrate
from src.routes.auth import auth_bp
from src.models import db
from flask_cors import CORS
from src.config import SQLALCHEMY_DATABASE_URI


app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run()
