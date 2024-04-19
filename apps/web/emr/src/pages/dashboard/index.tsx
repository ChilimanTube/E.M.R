import Link from "next/link";
import { useEffect, useState } from 'react';
import { Group, Paper, SimpleGrid, Text, Button } from '@mantine/core';
import { Navbar } from "@/components/Navbar/Navbar";
import Layout from "@/layout/dashboard-layout";
import classes from './Dashboard.module.css';
import {
    IconCircleCheck,
    IconMedicalCross,
    IconUsers,
    IconUrgent,
  } from '@tabler/icons-react';

const icons = {
    team: IconUsers,
    ready: IconCircleCheck,
    medic: IconMedicalCross,
    alert: IconUrgent,
  };

const data = [
    { title: 'Online Teams', icon: 'team', value: '3'},
    { title: 'Standby Teams', icon: 'ready', value: '2'},
    { title: 'Dispatched Teams', icon: 'medic', value: '1'},
    { title: 'Alerts today', icon: 'alert', value: '12'},
  ] as const;

export function StatsGrid() {
    const stats = data.map((stat) => {
      const Icon = icons[stat.icon];
  
      return (
        <div className="mainContainer" key={stat.title} >
          <Paper withBorder p="md" radius="md" key={stat.title} className={classes.paper}>
            <Group justify="space-between">
          <Text size="md" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
            </Group>
            <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
            </Group>
          </Paper>
        </div>
      );
    });
    return (
      <div className={classes.root}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
      </div>
    );
  }


export default function Dashboard() {
  const [message, setMessage] = useState<string | null>(null);


  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Dashboard</h1>
                <div className={classes.container}>
                    <StatsGrid />
                    {message && <p>{message}</p>}
                </div>
            </div>
        </Layout>
    );
}