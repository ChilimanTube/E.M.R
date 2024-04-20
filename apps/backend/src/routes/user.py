from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models import Users

user_bp = Blueprint('user', __name__)


@user_bp.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = Users.query.filter_by(email=current_user).first()
    if user:
        return jsonify({'username': user.username}), 200
    else:
        return jsonify({'error': 'User not found'}), 404


@user_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200