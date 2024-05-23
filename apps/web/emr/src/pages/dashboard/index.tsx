import Link from "next/link";
import { useEffect, useState, HTMLAttributes } from 'react';
import { Group, Paper, SimpleGrid, Text, Button } from '@mantine/core';
import { Navbar } from "@/components/Navbar/Navbar";
import Layout from "@/layout/dashboard-layout";
import classes from './Dashboard.module.css';
import axios from "axios";
import {
  IconCircleCheck,
  IconMedicalCross,
  IconUsers,
  IconUrgent,
} from '@tabler/icons-react';
import { DndCard } from "@/components/DndCard/DndCard";
import { Team } from '@/pages/dashboard/teams/index';

const icons = {
  team: IconUsers,
  ready: IconCircleCheck,
  medic: IconMedicalCross,
  alert: IconUrgent,
};

const data = [
  { title: 'Online Teams', icon: 'team', value: '3' },
  { title: 'Standby Teams', icon: 'ready', value: '2' },
  { title: 'Dispatched Teams', icon: 'medic', value: '1' },
  { title: 'Alerts today', icon: 'alert', value: '12' },
] as const;

export interface StatsGridProps extends HTMLAttributes<HTMLDivElement> {
  stats: {
    title: string;
    icon: string;
    value: string;
  }[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statsElements = stats.map((stat) => {
    const Icon = icons[stat.icon as keyof typeof icons];

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
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{statsElements}</SimpleGrid>
    </div>
  );
}


export default function Dashboard() {
  const [message, setMessage] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [stats, setStats] = useState<StatsGridProps['stats']>([]);

  useEffect(() => {
    axios.get('https://api.vkral.xyz/api/statistics/teams')
      .then(response => {
        const allTeams = response.data.all_teams;
        console.log('All teams:', allTeams);
  
        const updatedStats = [
          { title: 'Online Teams', icon: 'team', value: allTeams.toString() },
        ];
        setStats(updatedStats);
      })
      .catch(error => {
        console.error('Error fetching team statistics:', error);
      });
  
    axios.get('https://api.vkral.xyz/api/statistics/teams/standby')
      .then(response => {
        const standbyTeams = response.data.standby_teams;
        console.log('Standby teams:', standbyTeams);
        setStats(prevStats => [
          ...prevStats,
          { title: 'Standby Teams', icon: 'ready', value: standbyTeams.toString() }
        ]);
      })
      .catch(error => {
        console.error('Error fetching team statistics:', error);
      });
  
    axios.get('https://api.vkral.xyz/api/statistics/teams/deployed')
      .then(response => {
        const deployedTeams = response.data.deployed_teams;
        console.log('Deployed teams:', deployedTeams);
        setStats(prevStats => [
          ...prevStats,
          { title: 'Deployed Teams', icon: 'medic', value: deployedTeams.toString() }
        ]);
      })
      .catch(error => {
        console.error('Error fetching team statistics:', error);
      });
  
    axios.get('https://api.vkral.xyz/api/statistics/alerts')
      .then(response => {
        const alerts = response.data.alerts;
        console.log('Alerts:', alerts);
        setStats(prevStats => [
          ...prevStats,
          { title: 'Alerts today', icon: 'alert', value: alerts.toString() }
        ]);
      })
      .catch(error => {
        console.error('Error fetching team statistics:', error);
      });
  
    axios.get('https://api.vkral.xyz/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  return (
    <Layout>
      <div className={classes.mainContainer}>
        <h1>Dashboard</h1>
        <div className={classes.container}>
          <StatsGrid stats={stats} />
          {teams.map(team => {
            console.log('Team:', team);
            return team && team.id ? (
              <DndCard key={team.id} team={team} />
            ) : null;
          })}
        </div>
      </div>
    </Layout>
  );
}