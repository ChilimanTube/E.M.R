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
    data = request.json
    name = data.get('name')
    status = data.get('status')

    if not name or not status:
        return jsonify({'error': 'Name and status are required'}), 400

    new_team = Teams(name=name, status=status)
    db.session.add(new_team)
    db.session.commit()
    return jsonify({'message': 'Team created', 'team_id': new_team.id}), 201