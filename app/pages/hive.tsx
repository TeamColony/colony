import React, { useRef, useState } from 'react';

//Packages
import Router from 'next/router';
import { useQuery, gql } from '@apollo/client';

//Styles
import styles from '../styles/hive.module.css';

//Components
import RequestCard from '../components/RequestCard/RequestCard';
import Loading from '../components/Loading';

export default function Hive(props: any) {

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

    const priceInput = useRef<HTMLInputElement>(null);
    const [colour, setColour] = useState("#B8B8B8");
    const [item, setItem] = useState(null);


    const changeType = (event: any) => {
        //todo: Do something
    }

    const onChange = (e: any) => {
        const re = /^[0-9\b.]+$/;
        console.log(e.target.value.length);
        if (e.target.value.length < 6) { }

        if (e.target.value === '' || re.test(e.target.value)
            && e.target.value.length < 6) {
            setColour("#B8B8B8")
        } else {
            setColour("#FF8888")
        }
    }


    const queryMultiple = () => {
        const jobData = useQuery(findUserJobs);
        const requestData = useQuery(findUserRequests);
        return [jobData, requestData];
    }

    const selectJob = (key: any) => {
        console.log(key);
        setItem(key);
    }

    const deleteJob = () => {
        
    }

    const [
        { loading: loading1, data: jobs },
        { loading: loading2, data: requests }
    ] = queryMultiple()

    if (loading1 || loading2) {
        return <Loading />
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
                        <div className={styles.leftJob}>
                            <span className="material-icons">work_outline</span>
                            <div style={{ fontWeight: 500 }}>Your Jobs</div>
                        </div>

                        <div onClick={() => { Router.push(`/newjob`) }} className={styles.rightJob}>
                            <span className={`material-icons ${styles.addButton}`}>add</span>
                        </div>
                    </div>

                    {jobs.findUserJobs.length != 0 ? (

                        <div className={styles.jobScroll}>
                            {jobs.findUserJobs.map((job: any, i: number) => (
                                    <div onClick={() => selectJob(i)} className={`${styles.jobItem}  ${item === i && styles.selectedJob}`}>
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


                    {item != null ? (

                        <div className={styles.jobDetails}>
                            <div className={styles.detailsHeader}>
                                <div className={styles.headerLeft}>
                                    <img src={jobs.findUserJobs[item!].image}></img>
                                    <span>{jobs.findUserJobs[item!].name}</span>
                                </div>
                                <div className={styles.headerRight}>

                                    <span className={`material-icons`}>delete</span>
                                    <div>Delete</div>
                                </div>
                            </div>

                            <div className={styles.inputSection}>
                                <div className={styles.inputBox} style={{ border: `solid ${colour}` }}>
                                    <span className={`${styles.unselectable} material-icons`}>payments</span>
                                    <input ref={priceInput} autoComplete="off" id="price" onChange={onChange} className={styles.infoInput} prefix="£" placeholder="Price..."></input>
                                </div>

                                <div className={styles.inputBox} style={{ border: `solid #B8B8B8` }}>
                                    <span className={`${styles.unselectable} material-icons`}>category</span>
                                    <input autoComplete="on" id="address" className={styles.infoInput} placeholder="Type"></input>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <></>
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