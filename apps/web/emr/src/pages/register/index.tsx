import { useState } from "react";
import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Text,
    Title,
    Modal,
} from "@mantine/core";

import classes from "./register.module.css";
import Link from "next/link";
import axios from 'axios';

function ConfimRegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="Registration Successful"
            transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
            centered
            shadow="xxl"
        >
            <Text>
                Your registration is completed. Please login to access the E.M.R system
            </Text>
            <Button onClick={() => window.location.href = '/login'} variant="light" style={{ marginTop: 15}}>Login</Button>
        </Modal>
    );
}

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [noTransitionOpened, setNoTransitionOpened] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleRegister = () => {
        if (!username|| !email || !password || !confirmPassword) {
            setError("Please fill in all required fields");
            return;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else if (password.length < 8) {
            setPasswordError("Password too short");
            return;
        }
        setError("");

        axios.post('http://127.0.0.1:5000/api/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            username: username
        }).then(response => {
            console.log('Registration successful:', response.data);
            setNoTransitionOpened(true);
        }).catch(error => {
            console.error('Registration error:', error.response.data);
            setError("Registration failed. Please try again.");
        });
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className={classes.container}>
            <Container size={420} my={40}>
                <Title order={1}>Register</Title>
                <p style={{ fontSize: "small", marginBottom: 15 }}>
                    Register to access the E.M.R system
                </p>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.login}>
                    <Stack gap="md">
                        <TextInput
                            label="First Name"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.currentTarget.value)}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(event) => setLastName(event.currentTarget.value)}
                        />
                        <TextInput
                            label="Username"
                            placeholder="Enter your username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.currentTarget.value)}
                        />
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            required
                            description="Password must be at least 8 characters long"
                            value={password}                            
                            onChange={handlePasswordChange}
                            error={passwordError}
                        />
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.currentTarget.value)
                            }
                        />
                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <Button
                            variant="light"
                            color="blue"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            Already have an account?{' '}
                            <Link href='/login'>
                                <Anchor size="sm" component="button">
                                    Sign in
                                </Anchor>
                            </Link>
                        </Text>
                    </Stack>
                </Paper>
            </Container>
            <ConfimRegistrationModal isOpen={noTransitionOpened} onClose={() => setNoTransitionOpened(false)} />
        </div>
    );
}
