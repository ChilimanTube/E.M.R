from flask import Flask
from flask_migrate import Migrate
from src.routes.auth import auth_bp
from flask_sqlalchemy import SQLAlchemy
from src.config import SQLALCHEMY_DATABASE_URI

app = Flask(__name__)

app.register_blueprint(auth_bp)

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route('/dashboard')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
