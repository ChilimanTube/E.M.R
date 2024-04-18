import React, { useState } from 'react';
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
  import classes from './DndCard.module.css';


export function DndCard() {
    const [teamStatus, setTeamStatus] = useState('Standby');
    const [teamName, setTeamName] = useState('Team Alpha');
    const linkProps = { href: '#' };

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
            <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
                {teamStatus}
            </Badge>
            <Text className={classes.title} fw={500} component="a" {...linkProps}>
                {teamName}
            </Text>
        </Card>
    );
}