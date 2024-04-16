import { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSignIn = () => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
        }

        if (!password) {
            setPasswordError('Password is required');
        }
        
        if (email && password && isValidEmail(email)) {
            // Perform sign-in logic here if all validations pass
            // Redirect to the dashboard page
            window.location.href = '/dashboard';
        }
        // Perform sign-in logic here if all validations pass
    };

    const isValidEmail = (email: string) => {
        // Email validation logic here
        // You can use a regular expression or any other method to validate the email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className={classes.container}>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.login}>
                    <TextInput
                        label="Email"
                        placeholder="you@emr.dev"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        required
                        mt="md"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" onClick={handleSignIn}>
                        Sign in
                    </Button>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Anchor size="sm" component="button">
                            Create account
                        </Anchor>
                    </Text>
                </Paper>
            </Container>
        </div>
    );
}