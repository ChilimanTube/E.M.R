import React, { useState } from "react";
import classes from './ReportEmergency.module.css';
import { TeamCard } from "@/components/TeamCard/TeamCard";
import { Stepper, Select, Button, Input } from '@mantine/core';

const locations = [
    { group: 'Stanton', items: ['Hurston', 'Crusader', 'MicroTech', 'ArcCorp'] },
    { group: 'Pyro', items: ['Pyro I', 'Pyro II', 'Pyro IV', 'Pyro V', 'Pyro VI'] }
];


export default function ReportEmergency() {
    const [showForm, setShowForm] = useState(false);
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    return (
        <main className={classes.main}>
            <h1>Report Emergency</h1>
            <div className={classes.container}>
                {!showForm && (
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
                )}

                <div className={`${classes.formContainer} ${showForm ? classes.fadeIn : classes.fadeOut}`}>
                    {showForm && (

                        <Stepper active={active} onStepClick={setActive} color="red" classNames={{ separator: classes.separator }}>
                            <Stepper.Step label="Location" description="Select the location">
                                <Select
                                    label="Select the location of the emergency"
                                    placeholder="Select nearest planet or moon"
                                    data={locations}
                                    searchable
                                    required
                                    comboboxProps={{
                                        shadow: 'md',
                                        transitionProps: { transition: 'pop', duration: 200 },
                                    }}
                                    className={classes.select}
                                    labelProps={{ className: classes.label }}
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
                            <Stepper.Step label="Clients" description="Number of clients">
                                <Input />
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Injuries" description="Highest Tier injury">
                                Step 3 content: Get full access
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="CrimeStat" description="Highest CrimeStat Level">
                                Step 3 content: Get full access
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={nextStep} color="red" variant="light" className={classes.button}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Time Left" description="Time left before death">
                                Step 3 content: Get full access
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
                                Completed, click back button to get to previous step
                                <div className={classes.buttonContainer}>
                                    <Button onClick={prevStep} color="red" variant="light" className={classes.button}>
                                        Previous
                                    </Button>
                                    <Button onClick={() => console.log("Submit")} color="red" variant="light" className={classes.button}>
                                        Submit
                                    </Button>
                                </div>
                            </Stepper.Completed>
                        </Stepper>
                    )}
                </div>
            </div>
        </main>
    );
}