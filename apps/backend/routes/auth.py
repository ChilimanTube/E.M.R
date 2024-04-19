from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/login', methods=['POST'])
def login():
    # Authentication logic here
    # Retrieve email and password from request
    email = request.json.get('email')
    password = request.json.get('password')

    # Check email and password against database or any other authentication method
    if email == 'example@example.com' and password == 'password':
        # Return success response if authentication succeeds
        return jsonify({'message': 'Login successful'})
    else:
        # Return error response if authentication fails
        return jsonify({'error': 'Invalid email or password'}), 401
