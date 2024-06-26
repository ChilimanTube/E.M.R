from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from src.models import Users
from src.models import db

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/login', methods=['POST'])
def login():
    print(request.json)
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        print('Email and password are required, 400')
        return jsonify({'error': 'Email and password are required'}), 400

    user = Users.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        print('Login successful, 200')
        return jsonify(access_token=access_token)
    else:
        print('Invalid email or password, 401')
        return jsonify({'error': 'Invalid email or password'}), 401


@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    if not email or not password or not username:
        return jsonify({'error': 'Email, password, and username are required'}), 400

    if Users.query.filter_by(email=email).first():
        print('Email already registered, 400')
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = generate_password_hash(password)
    new_user = Users(email=email, password=hashed_password, username=username, first_name=first_name, last_name=last_name)
    db.session.add(new_user)
    db.session.commit()
    print(request.get_data(as_text=True).encode('utf-8'))
    print('Registration successful, 201')
    return jsonify({'message': 'Registration successful', 'user_id': new_user.id}), 201
