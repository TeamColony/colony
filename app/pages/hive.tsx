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

    const findUserRequests = gql`
    {

        findUserRequests(id: "${String(props.user.id)}") {
            user{
                name,
                image
            },
            job{
                name,
                image
            },
            address,
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
        { loading: loading2, data: requests }
    ] = queryMultiple()

    if (loading1 || loading2) {
        return <div>loading</div>
    }

    return (

        console.log(jobs),
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
                        <div className={styles.leftJob}>
                            <span className="material-icons">work_outline</span>
                            <div style={{ fontWeight: 500 }}>Your Jobs</div>
                        </div>

                        <div className={styles.rightJob}>
                             <span className={`material-icons ${styles.addButton}`}>add</span>
                        </div>
                    </div>

                    {jobs.findUserJobs.length != 0 ? (

                        <div className={styles.jobScroll}>
                            {jobs.findUserJobs.map((job: any) => (
                                <div onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.jobItem}>
                                    <img className={styles.jobImage} src={job.image} />
                                    <div>{job.name}</div>
                                </div>
                            ))}
                        </div>

                    ) : (
                            <div className={styles.noJobs}>
                                <span className="material-icons">info</span>
                                <div>Oops... no jobs yet!</div>
                            </div>
                        )}


                </div>


                <div className={styles.jobsContainer}>
                    <div className={`${styles.jobsHeader} unselectable`}>
                        <div className={styles.leftJob}>
                            <span className="material-icons">waving_hand</span>
                            <div style={{ fontWeight: 500 }}>Requests</div>
                        </div>
                    </div>

                </div>

                {requests.findUserRequests.length != 0 ? (

                    <div >
                        {requests.findUserRequests.map((request: any) => (
                            <RequestCard request={request} />
                        ))}
                    </div>

                ) : (
                        <div className={styles.noRequests}>
                            <span className="material-icons">info</span>
                            <div>No requests received!</div>
                        </div>
                    )}

                
            </div>
        </div>
    )
}