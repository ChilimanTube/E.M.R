import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Group } from '@mantine/core';
import {
    IconMapPin,
    IconUsers,
    IconFirstAidKit,
    IconHelpHexagon,
    IconSlice,
    IconHourglassHigh
} from '@tabler/icons-react';
import classes from './ReportRecap.module.css';

export const recapData = [
    { icon: IconMapPin, title: 'Location:', description: 'Hurston' },
    { icon: IconUsers, title: 'Clients:', description: ['ChilimanTube', 'Client2', 'Client3'] }, 
    { icon: IconHelpHexagon, title: 'Emergency Type:', description: 'Injured' },
    { icon: IconFirstAidKit, title: 'Injuries:', description: 'Tier 2' },
    { icon: IconSlice, title: 'CrimeStat:', description: 'Level 1' },
    { icon: IconHourglassHigh, title: 'Time Left:', description: '1 Hour' },
];

interface FeatureProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function RecapFeature({ icon: Icon, title, description }: FeatureProps) {
    let formattedDescription = description;
    
    if (Array.isArray(description)) {
        formattedDescription = description.join(', ');
    }
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40} color='red'>
                <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ThemeIcon>
            <Group>
                <Text mt="sm" mb={7} fw={700}>
                    {title}
                </Text>
                <Text size="sm" c="dimmed" lh={1.6} mt={5} fw={500}>
                    {formattedDescription}
                </Text>
            </Group>
        </div>
    );
}

interface ReportRecapProps {
    data: FeatureProps[];
}

export function ReportRecap({ data }: ReportRecapProps) {
    if (!data || !Array.isArray(data)) {
        return null;
    }
    const features = data.map((feature: FeatureProps, index: number) => <RecapFeature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <SimpleGrid
                mt={20}
                ml={rem(140)}
                cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
                spacing={{ base: 'xl', md: 50 }}
                verticalSpacing={{ base: 'xl', md: 50 }}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}