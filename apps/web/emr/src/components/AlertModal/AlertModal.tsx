import React from "react";
import { Modal, Text, Select, Button } from '@mantine/core';
import axios from "axios";
import { useEffect, useState } from "react";
import classes from './AlertModal.module.css';


export default function AlertModal({ isOpen, onClose, onSumbit, }:
    {
        isOpen: boolean;
        onClose: () => void;
        onSumbit: () => void;
    }
) {

    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/teams')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
            });
    }, []);

    const handleDeploy = () => {
        axios.post('http://127.0.0.1:5000/api/teams/deploy', { team_name: selectedTeam })
            .then(response => {
                console.log('Response from server:', response.data);
                onSumbit();
                onClose();
            })
            .catch(error => {
                console.error('Error deploying team:', error);
            });
    }
    
    return (
        <Modal
            title="Deploy Team"
            opened={isOpen}
            onClose={onClose}
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Text>Select a team:</Text>
            <Select
                onChange={(value) => setSelectedTeam(value as string)}
                data={teams.map((team: any) => team.name)}
                value={selectedTeam}
            />
            <br />
            <Button onClick={handleDeploy}>Deploy</Button>
        </Modal>
    );
}