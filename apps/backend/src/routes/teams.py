from flask import Blueprint, jsonify, request
from src.models import Teams, db, Responders

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
    print('Team deleted', team_id, 200)
    return jsonify({'message': 'Team deleted', 'team_id': team.id}), 200


@teams_bp.route('/api/teams/<int:team_id>/members/add', methods=['POST'])
def add_member(team_id):
    team = Teams.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404
    data = request.json
    responder = Responders(responder_name=data.get('name'), role=data.get('role'), team_id=team_id)
    db.session.add(responder)
    db.session.commit()
    print('Member added to team', 200)
    return jsonify({'message': 'Member added to team', 'team_id': team.id}), 200


@teams_bp.route('/api/teams/<int:team_id>/members/remove/<string:responder_name>', methods=['DELETE'])
def remove_member(team_id, responder_name):
    responder = Responders.query.filter_by(team_id=team_id).filter_by(responder_name=responder_name).first()
    if not team_id:
        return jsonify({'error': 'Team not found'}), 404

    if not responder_name:
        return jsonify({'error': 'Responder Name is required'}), 400

    if responder:
        db.session.delete(responder)
        db.session.commit()
        print('Responder removed from team', 200)
        return jsonify({'message': 'Responder removed from team', 'team_id': team_id}), 200
    else:
        return jsonify({'error': 'Responder not found'}), 404

@teams_bp.route('/api/teams/<int:team_id>/members', methods=['GET'])
def get_members(team_id):
    responders = Responders.query.filter_by(team_id=team_id).all()
    if not responders:
        return jsonify({'error': 'Team not found'}), 404

    return jsonify([responder.serialize() for responder in responders]), 200


@teams_bp.route('/api/teams/<int:team_id>/members/<int:responder_id>', methods=['PUT'])
def update_member(team_id, responder_id):
    responder = Responders.query.filter_by(team_id=team_id).filter_by(responder_id=responder_id).first()
    if not responder:
        return jsonify({'error': 'Responder not found'}), 404

    data = request.json
    responder_name = data.get('name')
    role_id = data.get('status')
    team_id = data.get('team_id')

    if not responder_name or not role_id or not team_id:
        return jsonify({'error': 'Name, team_id and role_id are required'}), 400

    responder.responder_name = responder_name
    responder.status = role_id
    responder.team_id = team_id
    db.session.commit()
    print('Responder updated', 200)
    return jsonify({'message': 'Responder updated', 'team_id': team_id, 'responder_id': responder_id}), 200