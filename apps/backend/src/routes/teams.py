from flask import Blueprint, jsonify, request
from src.models import Teams, db

teams_bp = Blueprint('teams', __name__)


@teams_bp.route('/api/teams', methods=['GET'])
def get_teams():
    teams = Teams.query.all()
    return jsonify([team.serialize() for team in teams]), 200


@teams_bp.route('/api/teams/<int:team_id>', methods=['GET'])
def get_team(team_id):
    team = Teams.query.get(team_id)
    if team:
        return jsonify(team.serialize()), 200
    else:
        return jsonify({'error': 'Team not found'}), 404


@teams_bp.route('/api/teams/create', methods=['POST'])
def create_team():
    print(request.json)
    data = request.json
    name = data.get('name')
    status = data.get('status')

    if not name or not status:
        return jsonify({'error': 'Name and status are required'}), 400

    new_team = Teams(name=name, status=status)
    db.session.add(new_team)
    db.session.commit()
    print('New team created', 201)
    return jsonify({'message': 'Team created', 'team_id': new_team.id}), 201


@teams_bp.route('/api/teams/<int:team_id>/update', methods=['PUT'])
def update_team(team_id):
    team = Teams.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    data = request.json
    name = data.get('name')
    status = data.get('status')

    if not name or not status:
        return jsonify({'error': 'Name and status are required'}), 400

    team.name = name
    team.status = status
    db.session.commit()
    print('Team updated', 200)
    return jsonify({'message': 'Team updated', 'team_id': team.id}), 200


@teams_bp.route('/api/teams/<int:team_id>/delete', methods=['DELETE'])
def delete_team(team_id):
    team = Teams.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    db.session.delete(team)
    db.session.commit()
    print('Team deleted', 200)
    return jsonify({'message': 'Team deleted', 'team_id': team.id}), 200