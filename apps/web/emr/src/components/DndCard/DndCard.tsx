import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { Team } from '@/pages/dashboard/teams/index';

interface DndCardProps {
    team: Team;
}

export function DndCard({ team }: DndCardProps) {
    const [teamStatus, setTeamStatus] = useState('Standby');
    const [teamName, setTeamName] = useState(team.name);

    useEffect(() => {
        setTeamStatus(team.status);
    }, [team.status]);

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
            <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
                {teamStatus}
            </Badge>
            <Text className={classes.title} fw={500}>
                {teamName}
            </Text>
            <Text fz="sm" c="dimmed" lineClamp={4}>
                Team ID: {team.id}
            </Text>
        </Card>
    );
}