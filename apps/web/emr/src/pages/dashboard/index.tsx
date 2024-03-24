import Link from "next/link";
import { Button } from "@mantine/core";
import { Navbar } from "@/components/Navbar/Navbar";
import Layout from "@/layout/dashboard-layout";

export default function Dashboard() {
    return (
        	<Layout>
                <h1>Dashboard</h1>
                <Button>Click me</Button>
                <Link href="/">
                    <p>Go to Home Page</p>
                </Link>
            </Layout>
    );
}