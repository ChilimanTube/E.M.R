import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
const logo = "/mrs_logo.webp";

export default function Home() {
  return (
    <>
      <Head>
        <title>E.M.R</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Made for Medrunner
          </p>
          <a href="https://medrunner.space"><Image src={logo} alt="Medrunner Logo" width={100} height={100}/></a>
          <div>
            <a
              href="https://github.com/ChilimanTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              Vojtěch Král
              <br />
              aka ChilimanTube
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <h2>Welcome to{" "}</h2>
          <h1>Emergency Management & Response </h1>
        </div>

        <div className={styles.grid}>
          <Link href="/dashboard"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Dashboard <span>-&gt;</span>
            </h2>
            <p>
              Enter the EMR dashboard.
            </p>
          </Link>

          <Link
            href="https://medrunner.space"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Medrunner <span>-&gt;</span>
            </h2>
            <p>
              Learn about Medrunner!
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
