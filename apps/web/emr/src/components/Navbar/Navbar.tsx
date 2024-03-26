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
  IconUser,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconCategory, disabled: false},
  { link: '/dashboard/dispatch', label: 'Dispatch', icon: IconHeartRateMonitor, disabled: false},
  { link: '/dashboard/teams', label: 'Teams', icon: IconUsers, disabled: false },
  { link: '', label: 'Emergencies', icon: IconHeartbeat, disabled: true},
  { link: '/dashboard/statistics', label: 'Statistics', icon: IconChartPie, disabled: false },
  { link: '', label: 'Chat', icon: IconMessageCircle, disabled: true },
  { link: '', label: 'Map', icon: IconMap, disabled: true },
  { link: '', label: 'Guides', icon: IconBook, disabled: true },
  { link: 'https://www.medrunner.space/emergency-response-guide', label: 'ERG', icon: IconFileDescription, disabled: false},
  { link: '', label: 'Medals', icon: IconBadges, disabled: true },
  { link: '', label: 'Settings', icon: IconSettings, disabled: true },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link
      className={`${classes.link} ${item.disabled ? classes.disabledLink : ''}`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
      }}
      target={/^https:\/\//.test(item.link) ? '_blank' : undefined}
      rel={/^https:\/\//.test(item.link) ? 'noopener noreferrer' : undefined}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
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
        <Link href="/" className={`${classes.link} ${classes.disabledLink}`} onClick={(event) => event.preventDefault()}>
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <span>Username</span>
        </Link>
        <Link href="/" className={`${classes.link} ${classes.disabledLink}`} onClick={(event) => event.preventDefault()}>
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