from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from src.models import Users
from src.models import db

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/login', methods=['POST'])
def login():
    print(request.json)
    data = request.json
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        print('Email and password are required, 400')
        return jsonify({'error': 'Email and password are required'}), 400

    user = Users.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        print('Login successful, 200')
        return jsonify({'message': 'Login successful'})
    else:
        print('Invalid email or password, 401')
        return jsonify({'error': 'Invalid email or password'}), 401


@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if Users.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = generate_password_hash(password)

    new_user = Users(email=email, password=hashed_password, username=username, first_name=first_name, last_name=last_name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201
