import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import Link from 'next/link';
import {
  IconFileDescription,
  IconSettings,
  IconBadges,
  IconSwitchHorizontal,
  IconLogout,
  IconMap,
  IconBook,
  IconChartPie,
  IconHeartRateMonitor,
  IconCategory,
  IconHeartbeat,
  IconMessageCircle,
  IconUsers,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Dashboard', icon: IconCategory },
  { link: '', label: 'Dispatch', icon: IconHeartRateMonitor },
  { link: '', label: 'Teams', icon: IconUsers },
  { link: '', label: 'Emergencies', icon: IconHeartbeat },
  { link: '', label: 'Statistics', icon: IconChartPie },
  { link: '', label: 'Chat', icon: IconMessageCircle },
  { link: '', label: 'Map', icon: IconMap },
  { link: '', label: 'Guides', icon: IconBook },
  { link: '', label: 'SOP', icon: IconFileDescription },
  { link: '', label: 'Medals', icon: IconBadges },
  { link: '', label: 'Settings', icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v0.5.2</Code>
          <h3>E.M.R</h3>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link href="/" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}