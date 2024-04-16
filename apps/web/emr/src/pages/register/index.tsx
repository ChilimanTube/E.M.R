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
} from "@mantine/core";

import classes from "./register.module.css";
import Link from "next/link";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError('');
    };


    const handleRegister = () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        // Perform registration logic here

        setError("");
    };


    const isValidEmail = (email: string) => {
        // Email validation logic here
        // You can use a regular expression or any other method to validate the email format
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
                            required
                            value={firstName}
                            onChange={(event) => setFirstName(event.currentTarget.value)}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your last name"
                            required
                            value={lastName}
                            onChange={(event) => setLastName(event.currentTarget.value)}
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
        </div>
    );
}