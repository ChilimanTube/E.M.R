import React, {useState} from "react";
import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import classes from './EmergencyCard.module.css';
import AlertModal from "../AlertModal/AlertModal";
import {
    IconMedicalCross,
    IconPlanet,
    IconClockHour4,
    IconActivity,
    IconUsers
} from '@tabler/icons-react';
import { Emergency, Alert } from '@/pages/dashboard/emergencies/index';
import axios from "axios";


interface EmergencyCardProps {
    emergency: Emergency;
    alert?: Alert
    onDeploy: () => void;
    onDelete: () => void;
}


export default function EmergencyCard({ emergency, onDeploy }: EmergencyCardProps) {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const timeOfDeath = new Date(emergency.time_of_death);
    const timeRemaining = timeOfDeath.getTime() - Date.now();
    
    const formatTimeRemaining = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}h ${minutes % 60}m`;
    };
    
    let timeRemainingDisplay;
    if (timeRemaining >= 0) {
        timeRemainingDisplay = formatTimeRemaining(timeRemaining);
    } else {
        timeRemainingDisplay = 'Expired';
    }
    
    axios.get(`http://127.0.0.1:5000/api/emergency/${emergency.id}/alert`)
        .then(response => {
            const responseData: Alert[] = response.data;
            const alert = responseData[0];
            console.log('Alert:', response.data);
            console.log('Alert type:', response.data[0].id);
            console.log('Alert name:', response.data[0].name);
            
        })
        .catch(error => {
            console.error('Error fetching alert:', error);
        });


    const detailData = [
        { label: emergency.submitter, icon: IconUsers },
        { label: timeRemainingDisplay, icon: IconClockHour4 },
        { label: emergency.injuries, icon: IconActivity },
        { label: emergency.location, icon: IconPlanet },
        { label: emergency.type, icon: IconMedicalCross },
    ];

    const details = detailData.map((detail) => (
        <Center key={detail.label}>
            <detail.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{detail.label}</Text>
        </Center>
    ));

    const handleDeploy = () => {
        onDeploy();
        setIsAlertModalOpen(true);
    }

    const alertName = alert.name;
    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i.redd.it/medrunner-protect-stabilize-evacuate-interested-in-star-v0-1j32x4evqs491.png?width=2560&format=png&auto=webp&s=7d73c24fa81c8f21c7364413bfc3bcdfa925e96b" alt="MRS Emergency" />
            </Card.Section>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fw={500}>{alertName}</Text>
                    <Text fz="xs" c="dimmed">
                        Emergency ID: {emergency.id}
                    </Text>
                </div>
                <Badge variant="outline">{emergency.status}</Badge>
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
                    <Button radius="xl" style={{ flex: 1 }} onClick={handleDeploy}>
                        Deploy Team
                    </Button>
                </Group>
            </Card.Section>
            <AlertModal
                isOpen={isAlertModalOpen}
                onClose={() => setIsAlertModalOpen(false)}
                onSumbit={() => setIsAlertModalOpen(false)}
            />
        </Card>
    );
}