import Layout from "@/layout/dashboard-layout";
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    IconUserPlus,
    IconDiscount2,
    IconMedicalCrossFilled,
    IconMedicalCross,
    IconCheck,
    IconArrowUpRight,
    IconArrowDownRight,
  } from '@tabler/icons-react';
  import classes from './StatsGrid.module.css';


  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    medic: IconMedicalCross,
    success: IconCheck,
  };

  const data = [
    { title: 'Mission Count', icon: 'medic', value: '100', diff: 34 },
    { title: 'Successes', icon: 'success', value: '78', diff: 2 },
    { title: 'Fails / Aborts', icon: 'discount', value: '22', diff: -51 },
    { title: 'Success Rate', icon: 'success', value: '78', diff: +3 },
  ] as const;


  export function StatsGrid() {
    const stats = data.map((stat) => {
      const Icon = icons[stat.icon];
      const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
  
      return (
        <Paper withBorder p="md" radius="md" key={stat.title} className={classes.paper}>
          <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {stat.title}
        </Text>
        <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
          </Group>

          <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>{stat.value}</Text>
        <Text c={stat.title === 'Fails / Aborts' ? (stat.diff > 0 ? 'red' : 'teal') : (stat.diff > 0 ? 'teal' : 'red')} fz="sm" fw={500} className={classes.diff}>
          <span>{stat.diff}%</span>
          <DiffIcon size="1rem" stroke={1.5} />
        </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous week
          </Text>
        </Paper>
      );
    });
    return (
      <div className={classes.root}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
      </div>
    );
  }

export default function Statistics() {
    return (
        	<Layout>
            <h1>Dashboard</h1>
            <h2>Statistics</h2>
            <StatsGrid />
          </Layout>
    );
}