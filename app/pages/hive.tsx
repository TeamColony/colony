import React from 'react';

//Packages
import { GetServerSidePropsContext } from 'next';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router'

//Styles
import styles from '../styles/hive.module.css';

//Components
import RequestCard from '../components/RequestCard/RequestCard';

export default function Settings(props: any) {

    const findUserJobs = gql`
    {
         findUserJobs(id: "${String(props.user.id)}") {
             name
             image
         }
    }
    `;

    const findUserRequests = gql `
    {

        findUserRequests(id: "6093aea3206e8613759b2bd9") {
            user{
                name,
                image
            },
            job{
                name,
                image
            },
            postcode,
            request
                    
        }
    }
    `

    const queryMultiple = () => {
        const jobData = useQuery(findUserJobs);
        const requestData = useQuery(findUserRequests);
        return [jobData, requestData];
    }

    const [
        { loading: loading1, data: jobs },
        { loading: loading2, data: requests}
    ] = queryMultiple()

    if (loading1 || loading2) {
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
                        <div style={{ fontWeight: 500 }}>Your Jobs</div>
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
              

                <div className={styles.jobsContainer}>
                    <div className={`${styles.jobsHeader} unselectable`}>
                        <span className="material-icons">waving_hand</span>
                        <div style={{ fontWeight: 500 }}>Requests</div>
                    </div>

                </div>

                {requests.findUserRequests.map((request: any) => ( 
                    <RequestCard request={request}/>
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