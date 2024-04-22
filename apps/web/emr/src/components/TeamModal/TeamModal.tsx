import React, {useState} from 'react';
import { Modal, Text, TextInput, Select, Button, Group } from '@mantine/core';

export function TeamEditModal({ isOpen, onClose, teamName, onTeamNameChange, teamMembers, onTeamMemberChange, onRoleChange, onAddMember, onRemoveMember }: {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  onTeamNameChange: any;
  teamMembers: { name: string; role: string }[];
  onTeamMemberChange: (index: number, value: string) => void;
  onRoleChange: (index: number, value: string) => void;
  onAddMember: (name: string, role: string) => void;
  onRemoveMember: (index: number) => void;
}) {
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Unassigned');

  const handleAddMember = () => {
    onAddMember(newMemberName, newMemberRole);
    setNewMemberName('');
    setNewMemberRole('Unassigned');
  };

  
  return (
    <Modal
      title="Edit Team Details"
      opened={isOpen}
      onClose={onClose}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text>Team Name:</Text>
      <TextInput value={teamName} onChange={(event) => onTeamNameChange(event.target.value)} />

      <Text>Team Members:</Text>
      {Array.isArray(teamMembers) && teamMembers.map((member, index) => (
        <Group key={index}>
          <TextInput value={member.name} onChange={(event) => onTeamMemberChange(index, event.target.value)} />
          <Select
            value={member.role}
            onChange={(value) => onRoleChange(index, value as string)}
            data={['Team Leader', 'Pilot', 'Medic', 'Security', 'QRF', 'Unassigned']}
          />
          <Button onClick={() => onRemoveMember(index)} style={{ marginBottom: 20 }}>Remove</Button>
        </Group>
      ))}

      {isOpen && (
        <Group>
          <TextInput placeholder="Member Name" value={newMemberName} onChange={(event) => setNewMemberName(event.target.value)}/>
          <Select
            placeholder="Select Role"
            value={newMemberRole}
            onChange={(value) => setNewMemberRole(value as string)}
            data={['Team Leader', 'Pilot', 'Medic', 'Security', 'QRF', 'Unassigned']}
          />
        </Group>
      )}
      <br />
      <Button onClick={() => onAddMember(newMemberName, newMemberRole)}>Add Member</Button>
    </Modal>
  );
}