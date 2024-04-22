"""empty message

Revision ID: 25612e40192a
Revises: b14b7c0fcb1a
Create Date: 2024-04-22 11:22:00.601206

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25612e40192a'
down_revision = 'b14b7c0fcb1a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('alerts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('emergency_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'emergency', ['emergency_id'], ['id'])

    with op.batch_alter_table('emergency', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.String(length=80), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('emergency', schema=None) as batch_op:
        batch_op.drop_column('status')

    with op.batch_alter_table('alerts', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('emergency_id')

    # ### end Alembic commands ###