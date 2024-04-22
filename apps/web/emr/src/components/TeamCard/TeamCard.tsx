import React, { useState, useEffect } from 'react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Card, Image, Text, ActionIcon, Badge, Group, Center, Avatar, useMantineTheme, rem, List, TextInput, Select, } from '@mantine/core';
import classes from './TeamCard.module.css';
import { TeamEditModal } from '../TeamModal/TeamModal';
import axios from 'axios';
import { Team } from '@/pages/dashboard/teams/index';

export interface Member {
  id: number;
  name: string;
  role: string;
}

interface TeamCardProps {
  team: Team;
  onDelete: () => void;
}

export function TeamCard({ team, onDelete }: TeamCardProps) {
  const linkProps = { href: '#' };
  const theme = useMantineTheme();
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [teamName, setTeamName] = useState(team.name);
  const [teamStatus, setTeamStatus] = useState('Standby');
  const [teamMembers, setTeamMembers] = useState<Member[]>(team.members || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Unassigned');

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/teams/${team.id}/members`)
      .then(response => {
        setTeamMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching team members:', error);
      });
  }, []);


  const handleEditTeamNameClick = () => {
    setIsEditingTeamName(!isEditingTeamName);
  };
  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
    axios.put(`http://127.0.0.1:5000/api/teams/${team.id}`, { name: event.target.value })
      .then(response => {
        console.log('Team name updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating team name:', error);
      });
  };


  const handleTeamMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index].name = value;
    setTeamMembers(newMembers);
    axios.put(`http://127.0.0.1:5000/api/teams/${team.id}/members/${newMembers[index].id}`, { name: value })
      .then(response => {
        console.log('Team member updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating team member:', error);
      });
  };

  const handleRoleChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index].role = value;
    setTeamMembers(newMembers);
    // TODO: Handle on backend so only one team leader can be there at the same time
    axios.put(`http://127.0.0.1:5000/api/teams/${team.id}/members/${newMembers[index].id}`, { role: value })
      .then(response => {
        console.log('Team member role updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating team member role:', error);
      });
  };

  const handleAddMember = (name: string, role: string) => {
    axios.post(`http://127.0.0.1:5000/api/teams/${team.id}/members/add`, { name, role })
      .then(response => {
        console.log('Member added to team:', response.data);
        const newMembers = [...teamMembers, { id: response.data.responder_id, name, role }];
        setTeamMembers(newMembers);
        setNewMemberName('');
        setNewMemberRole('Unassigned');
      })
      .catch(error => {
        console.error('Error adding team member:', error);
      });
  };

  const handleRemoveMember = (index: number) => {
    const memberId = teamMembers[index].id;
    const memberName = teamMembers[index].name;
    axios.delete(`http://127.0.0.1:5000/api/teams/${team.id}/members/remove/${memberName}`)
      .then(response => {
        const newMembers = [...teamMembers];
        newMembers.splice(index, 1);
        setTeamMembers(newMembers);
      })
      .catch(error => {
        console.error('Error removing team member:', error);
      });
  };

  const handleDeleteTeam = () => {
    axios.delete(`http://127.0.0.1:5000/api/teams/${team.id}/delete`)
      .then(response => {
        console.log('Team deleted:', response.data);
        onDelete();
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
  };

  const sortedTeamMembers = Array.isArray(teamMembers)
    ? [...teamMembers].sort((a: Member, b: Member) => {
      const roleOrder: { [key: string]: number } = {
        'Team Leader': 0,
        Pilot: 1,
        Medic: 2,
        Security: 3,
        QRF: 4,
        Unassigned: 5,
      };
      return roleOrder[a.role] - roleOrder[b.role];
    })
    : [];

  
  let badgeGradient;
  switch (teamStatus) {
    case 'Standby':
      badgeGradient = { from: 'green', to: 'darkGreen' };
      break;
    case 'Deployed':
      badgeGradient = { from: 'yellow', to: 'red' };
      break;
    case 'Returning to base':
      badgeGradient = { from: 'blue', to: 'darkBlue' };
      break;
    default:
      badgeGradient = { from: 'green', to: 'yellow' };
  }

  return (
    <Card radius="md" className={classes.card} shadow="0 2px 10px rgba(0, 0, 0, 0.3)">
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/9aWAt37.png" height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
        {team.status}
      </Badge>

      {isEditingTeamName ? (
        <TextInput
          className={classes.title}
          value={teamName}
          onChange={handleTeamNameChange}
          onBlur={handleEditTeamNameClick}
        />
      ) : (
        <Text className={classes.title} fw={500} component="a" {...linkProps}>
          {teamName}
        </Text>
      )}

      <Text fz="sm" c="dimmed" lineClamp={4}>
        Team ID: {team.id}
      </Text>

      <List size="sm">
        {sortedTeamMembers.map((member: Member, index: number) => (
          <List.Item key={index}>
            <Group>
              {!isEditingTeamName ? (
                <Text>
                  <b>{member.role}:</b> {member.name}
                </Text>
              ) : (
                <Group gap="xs" align="center">
                  <TextInput
                    value={member.name}
                    onChange={(event) => handleTeamMemberChange(index, event.target.value)}
                  />
                  <Select
                    value={member.role}
                    onChange={(value) => handleRoleChange(index, value as string)}
                    data={['Team Leader', 'Pilot', 'Medic', 'Security', 'QRF', 'Unassigned']}
                  />
                </Group>
              )}
              {isEditingTeamName && (
                <ActionIcon onClick={() => handleRemoveMember(index)}>
                  <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
                </ActionIcon>
              )}
            </Group>
          </List.Item>
        ))}
      </List>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src="https://i1.sndcdn.com/artworks-PJIRtyJOeL88vnd2-3hRzbg-t500x500.jpg"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            Demo Dispatcher
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action} onClick={() => setIsModalOpen(true)}>
            <IconPencil style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[7]} />
          </ActionIcon>
          {isEditingTeamName && (
            <ActionIcon className={classes.action} onClick={() => console.log("Added")}>
              <IconPlus style={{ width: rem(16), height: rem(16) }} color={theme.colors.green[6]} />
            </ActionIcon>
          )}
          <ActionIcon className={classes.action} onClick={handleDeleteTeam}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>

      <TeamEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamName={teamName}
        onTeamNameChange={handleTeamNameChange}
        teamMembers={teamMembers}
        onTeamMemberChange={handleTeamMemberChange}
        onRoleChange={handleRoleChange}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
    </Card>
  );
}
