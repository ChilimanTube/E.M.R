import classes from './Teams.module.css';
import Layout from "@/layout/dashboard-layout";
import { ArticleCard } from '@/components/DndCard/DndCard';
import { DndList } from '@/components/DndBoard/DndBoard';

export default function Dispatch(){
    return (
        <Layout>
            <div className={classes.mainContainer}>
                <h1>Teams</h1>
                <div className={classes.container}>
                    <div className={classes.cardSpace}>
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                    </div>
                </div>
            </div>
        </Layout>
    );
}