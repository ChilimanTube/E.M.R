import { DndCard } from '@/components/DndCard/DndCard';
import { DndBoard } from '@/components/DndBoard/DndBoard';
import  Kanban  from '@/components/DndBoard/Kanban';
import classes from './Dispatch.module.css';
import Layout from "@/layout/dashboard-layout";

export default function Dispatch(){
    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Dispatch</h1>
                <div className={classes.container}>
                    <DndBoard />
                </div>
            </div>
        </Layout>
    );
}