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
} from '@mantine/core';
import classes from './DndCard.module.css';

const data = [
  {
    teamName: 'Team Alpha',
    leader: 'Chiliman',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Bravo',
    leader: 'Poptic',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Charlie',
    leader: 'Milo Wilo',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
];

export function ArticleCard() {
  const linkProps = { href: '#' };
  const theme = useMantineTheme();
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [teamName, setTeamName] = useState('Team Alpha');
  const [teamMembers, setTeamMembers] = useState(['John Doe', 'Jane Doe', 'Alice Doe']);

  const handleEditTeamNameClick = () => {
    setIsEditingTeamName(!isEditingTeamName);
  };

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = value;
    setTeamMembers(newMembers);
  };

  return (
    <Card radius="md" className={classes.card} shadow="0 2px 10px rgba(0, 0, 0, 0.3)">
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/9aWAt37.png" height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        Standby
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
        Team Members, alert name and location will be shown here.
      </Text>

      <List size="sm">
        {teamMembers.map((member, index) => (
          <List.Item key={index}>
            {isEditingTeamName ? (
              <TextInput
                value={member}
                onChange={(event) => handleTeamMemberChange(index, event.target.value)}
              />
            ) : (
              member
            )}
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
          <ActionIcon className={classes.action} onClick={handleEditTeamNameClick}>
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}



/*
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
  Code,
} from '@mantine/core';
import classes from './DndCard.module.css';

const data = [
  {
    teamName: 'Team Alpha',
    leader: 'Chiliman',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Bravo',
    leader: 'Poptic',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Charlie',
    leader: 'Milo Wilo',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
];


export function ArticleCard() {
  const linkProps = { href: '#' };
  const theme = useMantineTheme();

  const teams = data.map((team) => {
    return (
      <div>
        <Card.Section>
          <a {...linkProps}>
            <Image src="https://i.imgur.com/9aWAt37.png" height={180} />
          </a>
        </Card.Section>

        <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          Standby
        </Badge>

        <Text className={classes.title} fw={500} component="a" {...linkProps}>
          Team Alpha
        </Text>

        <Text fz="sm" c="dimmed" lineClamp={4}>
          Team Members, alert name and location will be shown here.
        </Text>

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
            <ActionIcon className={classes.action}>
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[7]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
            </ActionIcon>
          </Group>
        </Group>
      </div>
    );
  });

  return (
    <Card radius="md" className={classes.card} shadow="0 2px 10px rgba(0, 0, 0, 0.3)">
      {teams}
    </Card>
  );
}


*/

/*
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
} from '@mantine/core';
import classes from './DndCard.module.css';

const data = [
  {
    teamName: 'Team Alpha',
    leader: 'Chiliman',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Bravo',
    leader: 'Poptic',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
  {
    teamName: 'Team Charlie',
    leader: 'Milo Wilo',
    members: ['John Doe', 'Jane Doe', 'Alice Doe'],
    status: 'Standby',
  },
];


export function ArticleCard() {
  const linkProps = { href: '#' };
  const theme = useMantineTheme();


  return (
    <Card radius="md" className={classes.card} shadow="0 2px 10px rgba(0, 0, 0, 0.3)">
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/9aWAt37.png" height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        Standby
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        Team Alpha
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        Team Members, alert name and location will be shown here.
      </Text>

      <List size='sm'>
        <List.Item><b>Team Leader:</b> Poptic</List.Item>
        <List.Item><b>Medic:</b> Milo</List.Item>
        <List.Item><b>Medic:</b> Kampfkektz</List.Item>
        <List.Item><b>Security:</b> Wallzy</List.Item>
        <List.Item><b>Security:</b> Limata</List.Item>
        <List.Item><b>QRF:</b> Chiliman</List.Item>
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
          <ActionIcon className={classes.action}>
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
*/