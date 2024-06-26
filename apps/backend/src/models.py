from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    first_name = db.Column(db.String(256), unique=False, nullable=False)
    last_name = db.Column(db.String(256), unique=False, nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username


class Teams(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    status = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Team %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status
        }


class Roles(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<Role %r>' % self.name


class Alerts(db.Model):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    alert_type = db.Column(db.String(80), unique=False, nullable=False)  # Beacon / Emergency
    datetime = db.Column(db.DateTime, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=True)
    emergency_id = db.Column(db.Integer, db.ForeignKey('emergency.id'), nullable=True)

    def __repr__(self):
        return '<Alert %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'alert_type': self.alert_type,
            'datetime': self.datetime.isoformat(),
            'team_id': self.team_id,
            'emergency_id': self.emergency_id
        }


class AlertResult(db.Model):
    __tablename__ = 'alert_result'

    id = db.Column(db.Integer, primary_key=True)
    alert_id = db.Column(db.Integer, db.ForeignKey('alerts.id'), nullable=False)
    result = db.Column(db.String(80), nullable=False)
    completion_time = db.Column(db.DateTime, nullable=False)


class Responders(db.Model):
    __tablename__ = 'responders'
    id = db.Column(db.Integer, primary_key=True)
    responder_name = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.String(80), unique=False, nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=True)

    def __repr__(self):
        return '<AlertResult %r>' % self.result

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'team_id': self.team_id
        }


class Emergency(db.Model):
    __tablename__ = 'emergency'

    id = db.Column(db.Integer, primary_key=True)
    submitter = db.Column(db.String(80), nullable=False)
    client_ids = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(80), unique=False, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    time_of_death = db.Column(db.DateTime, nullable=True)
    injuries = db.Column(db.String(80), nullable=True)
    crime_stat = db.Column(db.String(80), nullable=True)
    status = db.Column(db.String(80), nullable=True)
    type = db.Column(db.String(80), nullable=True)

    def __repr__(self):
        return '<Emergency %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'submitter': self.submitter,
            'client_ids': self.client_ids.split(','),
            'location': self.location,
            'datetime': self.datetime.isoformat(),
            'time_of_death': self.time_of_death.isoformat(),
            'injuries': self.injuries,
            'crime_stat': self.crime_stat,
            'status': self.status,
            'type': self.type
        }