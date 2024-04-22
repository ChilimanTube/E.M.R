from flask import Blueprint, jsonify, request
from src.models import Teams, db, Alerts

statistics_bp = Blueprint('statistics', __name__)


@statistics_bp.route('/api/statistics/teams/standby', methods=['GET'])
def get_standby_teams():
    teams = Teams.query.filter_by(status='Standby').all()
    return jsonify({'standby_teams': len(teams)}), 200


@statistics_bp.route('/api/statistics/teams', methods=['GET'])
def get_all_teams():
    teams = Teams.query.all()
    return jsonify({'all_teams': len(teams)}), 200


@statistics_bp.route('/api/statistics/teams/deployed', methods=['GET'])
def get_deployed_teams():
    teams = Teams.query.filter_by(status='Deployed').all()
    return jsonify({'deployed_teams': len(teams)}), 200


@statistics_bp.route('/api/statistics/alerts', methods=['GET'])
def get_alerts():
    alerts_count = db.session.query(db.func.count(Alerts.id)).scalar()
    return jsonify({'alerts': alerts_count}), 200