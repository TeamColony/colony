import React, {useState} from 'react';
import styles from '../styles/settings.module.css';
import { GetServerSidePropsContext } from 'next';

export type Object = {
    category: string
    items: Array<items>
}

export type items = {
    icon: string
    name: string
    description: string
}

export default function Settings(props: any) {

    let settings: Array<Object> = [
        {
            category: "General",
            items: [
                {
                    icon: "notifications",
                    name: "ongoing job",
                    description: String(props.ongo)
                },
                {
                    icon: "lock",
                    name: "security",
                    description: ""
                },
                {
                    icon: "verified_user",
                    name: "privacy",
                    description: ""
                },
                {
                    icon: "language",
                    name: "language",
                    description: "English"
                },
            ]
        },
        {
            category: "Payment",
            items: [
                {
                    icon: "credit_card",
                    name: "card",
                    description: ""
                },
                {
                    icon: "toll",
                    name: "crypto",
                    description: "BTC, XMR"
                },
            ]
        },
        {
            category: "Data",
            items: [
                {
                    icon: "analytics",
                    name: "your data",
                    description: "5kb"
                },
            ]
        },

    ]

    const setJobs = () => {
        if (localStorage.getItem('show') == "true"){
            localStorage.setItem('show', 'false')
            props.setOngo('false');
        } else{

            localStorage.setItem('show', 'true')
            props.setOngo('true');
        }
    }

    return (
        <div className={styles.parent}>

            <div className={styles.bodyContent}>
                <div className={styles.profileInfoContainer}>

                    <div className={styles.profileLeft}>
                        <img className={styles.profilePicture} src={props.user.picture || props.user.image} />
                        <div className={styles.profileText}>
                            <div className={styles.profileName}>{props.user.name}</div>
                            <div className={styles.profileEmail}>{props.user.email}</div>
                        </div>
                    </div>

                    <span>›</span>
                </div>

                {settings.map((index) => (
                    <div className={styles.container}>
                        <span>{index.category}</span>
                        <div className={styles.sectionContainer}>
                            {index.items.map((index, number) => (
                                <div className={styles.section}>
                                    <div className={styles.sectionLeft}>
                                        <span className="material-icons">{index.icon}</span>
                                        <div className={styles.sectionName}>{index.name}</div>
                                    </div>

                                    <div onClick={() => number == 0 ? setJobs() : null} className={styles.sectionRight}>
                                        <div>{index.description}</div>
                                        <span>›</span>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let userID = context.query.slug
    return {
        props: {

        }
    }
}