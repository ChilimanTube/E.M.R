import React, { useEffect, useState }  from "react";
import classes from './Emergencies.module.css';
import Layout from "@/layout/dashboard-layout";
import EmergencyCard from "@/components/EmergencyCard/EmergencyCard";
import axios from "axios";

export interface Emergency {
    id: number;
    name: string;
    status: string;
    location: string;
}

export default function Emergencies() {
    const [emergencies, setEmergencies] = useState<Emergency[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/emergency')
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
                                <EmergencyCard key={emergency.id} emergency={emergency} onDelete={() => handleDeleteEmergency(emergency.id)} />
                            ) : null;
                        })}
                </div>
            </div>
        </Layout>
    );
}