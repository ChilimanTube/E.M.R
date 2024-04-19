import React, { useState } from 'react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
  List,
  TextInput,
  Select,
} from '@mantine/core';
import classes from './TeamCard.module.css';
import { TeamEditModal } from '../TeamModal/TeamModal';

export function TeamCard() {
  const linkProps = { href: '#' };
  const theme = useMantineTheme();
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [teamName, setTeamName] = useState('Team Alpha');
  const [teamStatus, setTeamStatus] = useState('Standby');
  const [teamMembers, setTeamMembers] = useState([
    { name: 'John', role: 'Team Leader' },
    { name: 'Jane', role: 'Medic' },
    { name: 'Alice', role: 'Pilot' },
  ]);

  const id = '123456';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditTeamNameClick = () => {
    setIsEditingTeamName(!isEditingTeamName);
  };

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index].name = value;
    setTeamMembers(newMembers);
  };

  const handleRoleChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    const currentTeamLeaderIndex = newMembers.findIndex((member) => member.role === 'Team Leader');

    if (value === 'Team Leader') {
      if (currentTeamLeaderIndex !== -1) {
        newMembers[currentTeamLeaderIndex].role = 'Unassigned';
      }
    }

    newMembers[index].role = value;

    setTeamMembers(newMembers);
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: 'Team Leader' }]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...teamMembers];
    newMembers.splice(index, 1);
    setTeamMembers(newMembers);
  };

  const handleDeleteTeam = () => {
    // Add your logic here to delete the team
    // You can remove the card from the UI or make an API call to delete the team from the backend
    console.log('Team deleted');
  };

  const sortedTeamMembers = teamMembers.sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
      'Team Leader': 0,
      Pilot: 1,
      Medic: 2,
      Security: 3,
      QRF: 4,
      Unassigned: 5,
    };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  let badgeGradient;
  switch (teamStatus) {
    case 'Standby':
      badgeGradient = { from: 'green', to: 'darkGreen' };
      break;
    case 'On Alert':
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
        {teamStatus}
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
        Team ID: {id}
      </Text>

      <List size="sm">
        {sortedTeamMembers.map((member, index) => (
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
            <ActionIcon className={classes.action} onClick={handleAddMember}>
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