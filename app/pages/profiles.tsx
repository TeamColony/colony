import React from 'react';
import styles from '../styles/profile.module.css';
import { GetServerSidePropsContext } from 'next';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router'

export default function Settings(props: any) {

    const findUserJobs = gql`
    {
         findUserJobs(id: "${String(props.user.id)}") {
             name
             image
         }
    }
    `;
 
    const queryMultiple = () => {
       const jobData = useQuery(findUserJobs);
       return [jobData];
    }
 
     const [
         { loading: loading1, data: jobs },
     ] = queryMultiple()
 
     if (loading1) {
         return <div>loading</div>
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
                </div>


                <div className={styles.jobsContainer}>
                    <div className={`${styles.jobsHeader} unselectable`}>
                        <span className="material-icons">work_outline</span>
                        <div style={{ fontWeight: 500 }}>Jobs Available</div>
                    </div>
                    <div className={styles.jobScroll}>
                        {jobs.findUserJobs.map((job: any) => (
                            <div onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.jobItem}>
                                <img className={styles.jobImage} src={job.image} />
                                <div>{job.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

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