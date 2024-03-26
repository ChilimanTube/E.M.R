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