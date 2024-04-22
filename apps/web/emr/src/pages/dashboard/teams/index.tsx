import classes from './Teams.module.css';
import Layout from "@/layout/dashboard-layout";
import { TeamCard, Member } from '@/components/TeamCard/TeamCard';
import { DndBoard } from '@/components/DndBoard/DndBoard';
import { Button, Modal, TextInput } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface Team extends Partial<Member> {
    id: number;
    name: string;
    status: string;
    members?: Member[];
    role?: string;
}

export default function Dispatch() {
    const [newTeamName, setNewTeamName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/teams')
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

    const handleDeleteTeam = (teamId: number) => {
        setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    };

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/teams/create', { name: newTeamName, status: 'Standby' })
            .then(response => {
                console.log('Response from server:', response.data);
                const newTeam = response.data;
                if (newTeam && newTeam.id !== undefined) {
                    console.log('New team id:', newTeam.id);
                    setTeams(prevTeams => [...prevTeams, newTeam]);
                    handleCloseModal();
                } else {
                    console.error('Error: New team id is undefined');
                }
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
                        overlayProps={{
                            backgroundOpacity: 0.55,
                            blur: 3,
                        }}
                        centered
                    >
                        <TextInput
                            value={newTeamName}
                            onChange={(event) => setNewTeamName(event.target.value)}
                            placeholder="Enter team name"
                        />
                        <br />
                        <Button onClick={handleSubmit}>Create</Button>
                    </Modal>
                </div>
                <div className={classes.container}>
                    <div className={classes.cardSpace}>
                        {teams.map(team => {
                            console.log('Team:', team);
                            return team && team.id ? (
                                <TeamCard key={team.id} team={team} onDelete={() => handleDeleteTeam(team.id)} />
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}