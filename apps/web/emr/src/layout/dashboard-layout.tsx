import React from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import styles from './db-layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.content}>{children}</main>
        </div>
    );
};

export default Layout;