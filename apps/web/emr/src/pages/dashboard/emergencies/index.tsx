import React from "react";
import classes from './Emergencies.module.css';
import Layout from "@/layout/dashboard-layout";
import EmergencyCard from "@/components/EmergencyCard/EmergencyCard";

export default function Emergencies() {
    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Emergencies</h1>
                <div className={classes.container}>
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                    <EmergencyCard />
                </div>
            </div>
        </Layout>
    );
}