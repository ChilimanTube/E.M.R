from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from src.models import Emergency, db

emergency_bp = Blueprint('emergency', __name__)


@emergency_bp.route('/api/emergency/create', methods=['POST'])
def emergency_submit():
    data = request.json
    clients = data.get('clients')
    location = data.get('location')
    emergency_type = data.get('type')
    injury = data.get('injury')
    crime_stat = data.get('crimeStat')
    time_of_death = data.get('timeLeft')

    if not clients or not location or not emergency_type or not injury or not crime_stat or not time_of_death:
        return jsonify({'error': 'All fields are required'}), 400

    submitter = clients[0]
    print('Submitter: ', submitter)
    clients.pop(0)
    client_ids = ','.join(clients)
    print(client_ids)

    time_of_death = datetime.now() + timedelta(minutes=time_of_death)

    new_emergency = Emergency(submitter=submitter, client_ids=client_ids, location=location, datetime=datetime.now(),
                              time_of_death=time_of_death, injuries=injury, crime_stat=crime_stat)

    db.session.add(new_emergency)
    db.session.commit()
    print(request.get_data(as_text=True).encode('utf-8'))
    print('Emergency submitted, 201')
    return jsonify({'message': 'Emergency submitted', 'emergency_id': new_emergency.id}), 201


@emergency_bp.route('/api/emergency', methods=['GET'])
def get_emergencies():
    emergencies = Emergency.query.all()
    return jsonify([emergency.serialize() for emergency in emergencies]), 200


@emergency_bp.route('/api/emergency/<int:emergency_id>/delete', methods=['DELETE'])
def delete_emergency(emergency_id):
    emergency = Emergency.query.get(emergency_id)
    if not emergency:
        return jsonify({'error': 'Emergency not found'}), 404

    db.session.delete(emergency)
    db.session.commit()
    print('Emergency deleted', 200)
    return jsonify({'message': 'Emergency deleted', 'emergency_id': emergency.id}), 200


@emergency_bp.route('/api/emergency/<int:emergency_id>/update', methods=['PUT'])
def update_emergency(emergency_id):
    emergency = Emergency.query.get(emergency_id)
    if not emergency:
        return jsonify({'error': 'Emergency not found'}), 404

    data = request.json
    clients = data.get('clients')
    location = data.get('location')
    emergency_type = data.get('type')
    injury = data.get('injury')
    crime_stat = data.get('crimeStat')
    time_of_death = data.get('timeLeft')

    if not clients or not location or not emergency_type or not injury or not crime_stat or not time_of_death:
        return jsonify({'error': 'All fields are required'}), 400

    submitter = clients[0]
    clients.pop(0)
    client_ids = ','.join(clients)

    time_of_death = datetime.now() + timedelta(minutes=time_of_death)

    emergency.submitter = submitter
    emergency.client_ids = client_ids
    emergency.location = location
    emergency.datetime = datetime.now()
    emergency.time_of_death = time_of_death
    emergency.injuries = injury
    emergency.crime_stat = crime_stat

    db.session.commit()
    print('Emergency updated', 200)
    return jsonify({'message': 'Emergency updated', 'emergency_id': emergency.id}), 200