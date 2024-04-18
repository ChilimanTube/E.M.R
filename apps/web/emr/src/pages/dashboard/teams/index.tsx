import classes from './Teams.module.css';
import Layout from "@/layout/dashboard-layout";
import { TeamCard } from '@/components/TeamCard/TeamCard';
import { DndBoard } from '@/components/DndBoard/DndBoard';

export default function Dispatch(){
    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Teams</h1>
                <div className={classes.container}>
                    <div className={classes.cardSpace}>
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                    </div>
                </div>
            </div>
        </Layout>
    );
}