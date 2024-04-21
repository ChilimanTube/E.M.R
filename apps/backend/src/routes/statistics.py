from flask import Blueprint, jsonify, request
from src.models import Teams, db

statistics_bp = Blueprint('statistics', __name__)


@statistics_bp.route('/api/statistics/teams/standby', methods=['GET'])
def get_teams():
    teams = Teams.query.filter_by(status='Standby').all()
    return jsonify({'standby_teams': len(teams)}), 200


@statistics_bp.route('/api/statistics/teams', methods=['GET'])
def get_all_teams():
    teams = Teams.query.all()
    return jsonify({'all_teams': len(teams)}), 200


@statistics_bp.route('/api/statistics/teams/onalert', methods=['GET'])
def get_teams_on_alert():
    teams = Teams.query.filter_by(status='On Alert').all()
    return jsonify({'on_alert_teams': len(teams)}), 200