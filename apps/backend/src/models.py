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


class AlertResult(db.Model):
    __tablename__ = 'alert_result'

    id = db.Column(db.Integer, primary_key=True)
    alert_id = db.Column(db.Integer, db.ForeignKey('alerts.id'), nullable=False)
    result = db.Column(db.String(80), nullable=False)
    completion_time = db.Column(db.DateTime, nullable=False)


class Responders(db.Model):
    __tablename__ = 'responders'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=True)

    def __repr__(self):
        return '<AlertResult %r>' % self.result


class Clients(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    rsi_handle = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return '<Client %r>' % self.name

class Emergency(db.Model):
    __tablename__ = 'emergency'
    id = db.Column(db.Integer, primary_key=True)
    submitter = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    client_ids = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    time_until_death = db.Column(db.DateTime, nullable=False)
    injuries = db.Column(db.String(80), nullable=False)
    crime_stat = db.Column(db.String(80), nullable=False)

emergency_clients = db.Table('emergency_clients',
    db.Column('emergency_id', db.Integer, db.ForeignKey('emergency.id'), primary_key=True),
    db.Column('client_id', db.Integer, db.ForeignKey('clients.id'), primary_key=True)
)