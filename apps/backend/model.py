from app import db


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username


class Teams(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<Team %r>' % self.name

class Roles(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<Role %r>' % self.name

class Alerts(db.Model):
    __tablename__ = 'statistics'

    id = db.Column(db.Integer, primary_key=True)
    namne = db.Column(db.String(80), unique=True, nullable=False)
    type = db.Column(db.String(80), unique=True, nullable=False)
    details = db.Column(db.String(80), unique=True, nullable=False)

class AlertResult(db.Model):
    __tablename__ = 'alert_result'

    id = db.Column(db.Integer, primary_key=True)
    alert_id = db.Column(db.Integer, db.ForeignKey('alerts.id'), nullable=False)
    result = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return '<AlertResult %r>' % self.result

