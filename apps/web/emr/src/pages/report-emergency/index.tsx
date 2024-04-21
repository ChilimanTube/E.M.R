import React, { useState } from "react";
import classes from './ReportEmergency.module.css';
import { Stepper, Select, Button, TextInput, Text, Slider, TagsInput } from '@mantine/core';
import { IconMapPin, IconUsers, IconFirstAidKit, IconHelpHexagon, IconSlice, IconHourglassHigh } from '@tabler/icons-react';
import { ReportRecap, recapData as initialRecapData } from '../../components/ReportRecap/ReportRecap';
import axios from "axios";

const locations = [
    { group: 'Stanton', items: ['Hurston', 'Crusader', 'MicroTech', 'ArcCorp'] },
    { group: 'Pyro', items: ['Pyro I', 'Pyro II', 'Pyro IV', 'Pyro V', 'Pyro VI'] }
];

const emergencyTypes = ['Stranded', 'Incapacitated', 'Injured'];
const injuryTiers = ['Tier 1', 'Tier 2', 'Tier 3', 'No injuries'];
const crimeStatLevels = ['None', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']

const marks = [
    { value: 30, label: '30 Mins' },
    { value: 60, label: '1 Hour' },
    { value: 90, label: '1 Hour 30 Mins' },
    { value: 120, label: '2 Hours' },
];

export const recapData = [
    { icon: IconMapPin, title: 'Location:', description: 'Hurston', },
    { icon: IconUsers, title: 'Clients:', description: 'ChilimanTube', },
    { icon: IconHelpHexagon, title: 'Emergency Type:', description: 'Injured', },
    { icon: IconFirstAidKit, title: 'Injuries:', description: 'Tier 2', },
    { icon: IconSlice, title: 'CrimeStat:', description: 'Level 1', },
    { icon: IconHourglassHigh, title: 'Time Left:', description: '1 Hour', },
];

export default function ReportEmergency() {
    const [showForm, setShowForm] = useState(false);
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 6 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const [userSelections, setUserSelections] = useState({
        location: '',
        clients: [] as string[],
        type: '',
        injury: '',
        crimeStat: '',
        timeLeft: 90
    });

    const generateRecapData = () => {
        const updatedRecapData = initialRecapData.map(item => {
            switch (item.title) {
                case 'Location:':
                    return { ...item, description: userSelections.location };
                case 'Clients:':
                    return { ...item, description: userSelections.clients };
                case 'Emergency Type:':
                    return { ...item, description: userSelections.type };
                case 'Injuries:':
                    return { ...item, description: userSelections.injury };
                case 'CrimeStat:':
                    return { ...item, description: userSelections.crimeStat };
                case 'Time Left:':
                    return { ...item, description: `${userSelections.timeLeft} minutes` };
                default:
                    return item;
            }
        });
        return updatedRecapData;
    }

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 6 || nextStep < 0;
        if (isOutOfBounds) {
            return;
        }
        setActive(nextStep);
        setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };

    const handleSubmit = () => {
        if (!userSelections.location || !userSelections.clients || !userSelections.type || !userSelections.injury || !userSelections.crimeStat || !userSelections.timeLeft) {
            console.error('Please fill in all required fields');
            return;
        }
        axios.post('http://127.0.0.1:5000/api/emergency',{
            location: userSelections.location,
            clients: userSelections.clients,
            type: userSelections.type,
            injury: userSelections.injury,
            crimeStat: userSelections.crimeStat,
            timeLeft: userSelections.timeLeft
        }).then(response => {
            console.log('Emergency reported:', response.data);
        }).catch(error => {
            console.error('Emergency report error:', error.response.data);
        });
    }

    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

    return (
        <main className={classes.main}>
            <h1>Report Emergency</h1>
            <div className={classes.container}>
                {!showForm && (
                    <div>
                        <Text>Need help? Let us come to you!</Text>
                        <div className={classes.buttonContainer}>
                            <Button
                                onClick={() => {
                                    setShowForm(true);
                                    setActive(0);
                                }}
                                className={classes.herobutton}
                                color="red"
                                size="lg"
                                variant="gradient"
                                gradient={{ from: 'red', to: 'darkRed', deg: 90 }}
                            >
                                SOS
                            </Button>
                            <Button
                                onClick={() => {
                                    window.location.href = '/';
                                }}
                                className={classes.herobutton}
                                color="red"
                                size="lg"
                                variant="light"
                                gradient={{ from: 'red', to: 'darkRed', deg: 90 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                <div className={`${classes.formContainer} ${showForm ? classes.fadeIn : classes.fadeOut}`}>
                    {showForm && (
                        <Stepper active={active} onStepClick={setActive} color="red" classNames={{ separator: classes.separator }}>
                            <Stepper.Step label="Location" description="Select the location" icon=<IconMapPin /> allowStepSelect={shouldAllowSelectStep(0)}>
                                <Select
                                    label="Select the location of the emergency"
                                    placeholder="Select nearest planet or moon"
                                    data={locations}
                                    searchable
                                    required
                                    comboboxProps={{
                                        shadow: 'lg',
                                        transitionProps: { transition: 'pop', duration: 200 },
                                    }}
                                    className={classes.select}
                                    labelProps={{ className: classes.label }}
                                    nothingFoundMessage="No locations found"
                                    value={userSelections.location}
                                    onChange={(value) => setUserSelections({ ...userSelections, location: value ?? '' })}
                                />
                                <div className={classes.buttonContainer}>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Clients" description="Number of clients" icon=<IconUsers /> allowStepSelect={shouldAllowSelectStep(1)}>
                                <div className={classes.formArea}>
                                    <TextInput
                                        label="Enter your RSI Handle (Submitter)"
                                        labelProps={{ className: classes.label }}
                                        placeholder="RSI Handle (in-game name)"
                                        required
                                        className={classes.inputLarge}
                                        value={userSelections.clients[0] || ''}
                                        onChange={(event) => setUserSelections({ ...userSelections, clients: [event.target.value, ...userSelections.clients.slice(1)] })}
                                    />
                                    <TagsInput
                                        label="Enter your team's RSI Handles"
                                        labelProps={{ className: classes.label }}
                                        placeholder="RSI Handles (in-game names)"
                                        required = {false}
                                        className={classes.inputLarge}
                                        value={userSelections.clients.slice(1)}
                                        onChange={(event: string[]) => setUserSelections({ ...userSelections, clients: [userSelections.clients[0], ...event] })}
                                    />
                                </div>
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Type" description="Type of emergency" icon=<IconHelpHexagon /> allowStepSelect={shouldAllowSelectStep(2)}>
                                <Select
                                    label="Select the type of emergency"
                                    placeholder="Select emergency type"
                                    data={emergencyTypes}
                                    searchable
                                    required
                                    comboboxProps={{
                                        shadow: 'lg',
                                        transitionProps: { transition: 'pop', duration: 200 },
                                    }}
                                    className={classes.select}
                                    labelProps={{ className: classes.label }}
                                    nothingFoundMessage="No types match the search query"
                                    value={userSelections.type}
                                    onChange={(value) => setUserSelections({ ...userSelections, type: value ?? '' })}
                                />
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Injuries" description="Highest Tier injury" icon=<IconFirstAidKit /> allowStepSelect={shouldAllowSelectStep(3)}>
                                <Select
                                    label="Select the highest injury tier you or your team has"
                                    placeholder="Select highest injury tier"
                                    data={injuryTiers}
                                    searchable
                                    required
                                    comboboxProps={{
                                        shadow: 'lg',
                                        transitionProps: { transition: 'pop', duration: 200 },
                                    }}
                                    className={classes.select}
                                    labelProps={{ className: classes.label }}
                                    nothingFoundMessage="No tiers match the search query"
                                    value={userSelections.injury}
                                    onChange={(value) => setUserSelections({ ...userSelections, injury: value ?? '' })}
                                />
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="CrimeStat" description="Highest CrimeStat Level" icon=<IconSlice /> allowStepSelect={shouldAllowSelectStep(4)}>
                                <Select
                                    label="Select the highest crime stat level you or your team has"
                                    placeholder="Select highest crime stat level"
                                    data={crimeStatLevels}
                                    searchable
                                    required
                                    comboboxProps={{
                                        shadow: 'lg',
                                        transitionProps: { transition: 'pop', duration: 200 },
                                    }}
                                    className={classes.select}
                                    labelProps={{ className: classes.label }}
                                    nothingFoundMessage="No CrimeStat levels match the search query"
                                    value={userSelections.crimeStat}
                                    onChange={(value) => setUserSelections({ ...userSelections, crimeStat: value ?? '' })}
                                />
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Time Left" description="Time left before death" icon=<IconHourglassHigh /> allowStepSelect={shouldAllowSelectStep(5)}>
                                <div className={classes.sliderArea}>
                                    <Text size="md" mt="xl" fw={700} className={classes.text}>Select the time until death</Text>
                                    <Slider
                                        color="red"
                                        marks={marks}
                                        max={120}
                                        defaultValue={90}
                                        label={(value) => `${value} minutes`}
                                        labelTransitionProps={{
                                            transition: 'skew-down',
                                            duration: 150,
                                            timingFunction: 'linear',
                                        }}
                                        className={classes.slider}
                                        value={userSelections.timeLeft}
                                        onChange={(value) => setUserSelections({ ...userSelections, timeLeft: value ?? '' })}
                                    />
                                </div>
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Completed>
                                {active === 6 && (
                                    <div>
                                        <Text size="md" mt="xl" fw={700} className={classes.text}>Report complete. Click submit to initiate rescue.</Text>
                                        <ReportRecap data={generateRecapData()} />
                                        <div className={classes.buttonContainer}>
                                            <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                                Previous
                                            </Button>
                                            <Button onClick={handleSubmit} color="red" variant="gradient" className={classes.button} gradient={{ from: 'red', to: 'darkRed', deg: 90 }}>
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Stepper.Completed>
                        </Stepper>
                    )}
                </div>
            </div>
        </main>
    );
}