import React from "react";
import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import classes from './EmergencyCard.module.css';
import {
    IconMedicalCross,
    IconPlanet,
    IconClockHour4,
    IconActivity,
    IconUsers
} from '@tabler/icons-react';


const alertmockdata = [
    { name: 'Alert 1', status: 'Incoming', location: 'Hourston', time: '1 Hour 21 minutes left', injury: 'Tier 2 Injury', clients: '2 Clients' },
    { name: 'Alert 2', status: 'Incoming', location: 'Yela', time: '1 hour left', injury: 'Tier 1 Injury', clients: '1 Client' },
    { name: 'Alert 3', status: 'Incoming', location: 'Daymar', time: '2 hours left', injury: 'Tier 3 Injury', clients: '3 Clients' },
    { name: 'Alert 4', status: 'Incoming', location: 'Delamar', time: '2 hours left', injury: 'Tier 2 Injury', clients: '2 Clients' },
];

const mockdata = [
    { label: '2 Clients', icon: IconUsers },
    { label: '1 Hour 21 minutes left', icon: IconClockHour4 },
    { label: 'Tier 2 Injury', icon: IconActivity },
    { label: 'Hourston', icon: IconPlanet },
];

export default function EmergencyCard() {
    const details = mockdata.map((detail) => (
        <Center key={detail.label}>
            <detail.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{detail.label}</Text>
        </Center>
    ));
    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i.redd.it/medrunner-protect-stabilize-evacuate-interested-in-star-v0-1j32x4evqs491.png?width=2560&format=png&auto=webp&s=7d73c24fa81c8f21c7364413bfc3bcdfa925e96b" alt="MRS Emergency" />
            </Card.Section>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fw={500}>Alert Furious Planet</Text>
                    <Text fz="xs" c="dimmed">
                        Emergency ID: 123456
                    </Text>
                </div>
                <Badge variant="outline">INCOMING</Badge>
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    Emergency Details
                </Text>

                <Group gap={8} mb={-8}>
                    {details}
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>
                    <Button radius="xl" style={{ flex: 1 }}>
                        Deploy Team
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}