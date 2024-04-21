from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models import Emergency

emergency_bp = Blueprint('emergency', __name__)


@emergency_bp.route('/api/emergency', methods=['POST'])
def emergency_submit():
    data = request.json
    clients = data.get('clients')
    location = data.get('location')
    emergency_type = data.get('type')
    injury = data.get('injury')
    crime_stat = data.get('crimeStat')
    time_until_death = data.get('timeLeft')

    if not clients or not location or not emergency_type or not injury or not crime_stat or not time_until_death:
        return jsonify({'error': 'All fields are required'}), 400

    submitter = clients[0]

    new_emergency = Emergency(submitter=submitter, client_ids=clients, location=location, datetime=datetime.now(),
                              time_until_death=time_until_death, injuries=injury, crime_stat=crime_stat)
