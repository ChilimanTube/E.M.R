import classes from './Teams.module.css';
import Layout from "@/layout/dashboard-layout";
import { TeamCard } from '@/components/TeamCard/TeamCard';
import { DndBoard } from '@/components/DndBoard/DndBoard';
import { Button, Modal, TextInput } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Team {
    id: number;
    name: string;
}

export default function Dispatch() {
    const [newTeamName, setNewTeamName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        axios.get('/api/teams')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
            });
    }, []);

    const handleCreateTeam = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTeamName('');
    };

    const handleSubmit = () => {
        axios.post('/api/teams/create', { name: newTeamName })
            .then(response => {
                const newTeamId = response.data.id;
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error creating team:', error);
            });
    };

    return (
        <Layout>
            <div className={classes.mainContainer}>
                <div className={classes.header}>
                    <h1>Teams</h1>
                    <Button
                        variant='gradient'
                        gradient={{ from: 'darkBlue', to: 'cyan' }}
                        className={classes.createButton}
                        onClick={handleCreateTeam}
                    >
                        Create Team
                    </Button>
                    <Modal
                        title="Create New Team"
                        opened={isModalOpen}
                        onClose={handleCloseModal}
                        size="xs"
                    >
                        <TextInput
                            value={newTeamName}
                            onChange={(event) => setNewTeamName(event.target.value)}
                            placeholder="Enter team name"
                        />
                        <Button onClick={handleSubmit}>Create</Button>
                    </Modal>
                </div>
                <div className={classes.container}>
                    <div className={classes.cardSpace}>
                        {teams.map(team => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}