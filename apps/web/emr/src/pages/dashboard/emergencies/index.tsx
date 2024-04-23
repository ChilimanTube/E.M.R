import React, { useEffect, useState } from "react";
import classes from './Emergencies.module.css';
import Layout from "@/layout/dashboard-layout";
import EmergencyCard from "@/components/EmergencyCard/EmergencyCard";
import axios from "axios";

export interface Emergency {
    id: number;
    status: string;
    location: string;
    type: string;
    time_of_death: number;
    injuries: string;
    clients: string[];
    crime_stat: string;
    submitter: string;
}

export interface Alert {
    id: number;
    name: string;
    alert_type: string;
    emergency_id: number;
    datetime: number;
    team_id: number;
}

export default function Emergencies() {
    const [emergencies, setEmergencies] = useState<Emergency[]>([]);

    useEffect(() => {
        axios.get('https://api.vkral.xyz/api/emergency')
            .then(response => {
                setEmergencies(response.data);
            })
            .catch(error => {
                console.error('Error fetching emergencies:', error);
            });
    }, []);

    const handleDeleteEmergency = (emergencyId: number) => {
        setEmergencies(prevEmergencies => prevEmergencies.filter(emergency => emergency.id !== emergencyId));
    }

    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Emergencies</h1>
                <div className={classes.container}>
                    {emergencies.map(emergency => {
                        console.log('Emergency:', emergency);
                        return emergency && emergency.id ? (
                            <EmergencyCard
                                key={emergency.id}
                                emergency={emergency}
                                onDeploy={() => console.log('Deploying team for emergency:', emergency.id)}
                                onDelete={() => handleDeleteEmergency(emergency.id)} />
                        ) : null;
                    })}
                </div>
            </div>
        </Layout>
    );
}