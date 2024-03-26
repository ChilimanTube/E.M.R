import Layout from "@/layout/dashboard-layout";
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    IconWaveSawTool,
    IconForbid,
    IconMedicalCrossFilled,
    IconMedicalCross,
    IconCheck,
    IconArrowUpRight,
    IconArrowDownRight,
  } from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import { DonutChart } from '@mantine/charts';
import { AreaChart } from '@mantine/charts';


  const icons = {
    rate: IconWaveSawTool,
    fail: IconForbid,
    medic: IconMedicalCross,
    success: IconCheck,
  };

  const data = [
    { title: 'Mission Count', icon: 'medic', value: '100', diff: 34 },
    { title: 'Successes', icon: 'success', value: '78', diff: 2 },
    { title: 'Fails / Aborts', icon: 'fail', value: '22', diff: -51 },
    { title: 'Success Rate', icon: 'rate', value: '78', diff: +3 },
  ] as const;


   const chartData = [
    { name: 'Successes', value: 78, color: 'green' },
    { name: 'Fails', value: 12, color: 'red' },
    { name: 'Aborts', value: 8, color: 'yellow'},
    { name: 'Canceled', value: 2, color: 'gray.6' },
  ];

  const chartDataPrevious = [
    { name: 'Successes', value: 75, color: 'green' },
    { name: 'Fails', value: 33, color: 'red' },
    { name: 'Aborts', value: 12, color: 'yellow' },
    { name: 'Canceled', value: 3, color: 'gray.6' },
  ];

  export const areaData = [
    {
      date: 'Mar 22',
      Missions: 16,
    },
    {
      date: 'Mar 23',
      Missions: 4,
    },
    {
      date: 'Mar 24',
      Missions: 8,
    },
    {
      date: 'Mar 25',
      Missions: 2,
    },
    {
      date: 'Mar 26',
      Missions: 31,
    },
    {
      date: 'Mar 27',
      Missions: 28,
    },
    {
      date: 'Mar 28',
      Missions: 36,
    },
  ];



  export function StatsGrid() {
    const stats = data.map((stat) => {
      const Icon = icons[stat.icon];
      const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
  
      return (
        <div className="mainContainer" key={stat.title}>
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
        </div>
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
            <h1 className={classes.dashTitle}>Statistics</h1>
            <StatsGrid />
            <div className={classes.charts}>
              <Group gap={50}>
                <div>
                  <Text fz="xs" mb="sm" ta="center">
                    Current Week
                  </Text>
                  <DonutChart
                   data={chartData}
                   tooltipDataSource="segment"
                   tooltipAnimationDuration={100}
                   mx="auto"
                   paddingAngle={3} />
                </div>

                <div>
                  <Text fz="xs" mb="sm" ta="center">
                    Previous Week
                  </Text>
                  <DonutChart
                   data={chartDataPrevious}
                   mx="auto"
                   paddingAngle={3}
                   tooltipDataSource="segment"
                   tooltipAnimationDuration={200}
                   />
                </div>
              </Group>
            </div>
            <div className={classes.areaChart}>
              <Text fz="lg" mb='md' ta="center">
                    Weekly Mission Count
              </Text>
              <AreaChart
                h={300}
                data={areaData}
                dataKey="date"
                type="stacked"
                tooltipAnimationDuration={200}
                unit=" alerts"
                series={[
                  { name: 'Missions', color: 'indigo.6' },
                ]}
              />
            </div>
          </Layout>
    );
}

/* 
<RadarChart
              h={300}
              data={radarData}
              dataKey="product"
              withPolarRadiusAxis
              series={[
                { name: 'current_week', color: 'lime.4', opacity: 0.1 },
                { name: 'sales_february', color: 'cyan.4', opacity: 0.1 },
              ]}
              gridColor='white.1'

            />
*/