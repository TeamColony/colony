import React, {useEffect, useState} from 'react';

//Packages
import { useQuery, gql } from '@apollo/client';

//Styles
import styles from '../styles/newjob.module.css';

import JobModal from '../components/JobModal/JobModal'

import Router from 'next/router';

export default function NewJob(props: any) {

    const node = React.createRef<HTMLInputElement>();

    const [displayModal, setDisplayModal] = useState(false);
    const [modalData, setModalData] = useState(false);

    const toggleModal = (job: any) => {
        console.log("meep");
        setModalData(job);
        setDisplayModal(dt => dt ? false : true)
    }

    const closeModal = () => {
        setDisplayModal(dt => dt ? false : true)
    }

    const handleClickOutside = (e: any) => {
        if (node?.current?.contains(e.target)) {
            return;
        }

        setDisplayModal(false);
    };

    useEffect(() => {
        if (displayModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [displayModal]);

    const findNewJobs = gql`
    {
        findNewJobs(id: "${String(props.user.id)}") {
             _id
             name,
             image,
             average,
             colour
         }
    }
    `;

    const {error, loading, data} = useQuery(findNewJobs);

    if(loading){
        return <div>Loading Data!</div>
    }

    return (
        <div className={styles.parent}>

            <div className={styles.jobHeader}>
                <div className={styles.leftHeader}>
                    <span onClick={() => { Router.push(`/hive`) }} className="unselectable material-icons">arrow_back</span>
                    <div>New Job</div>
                </div>
            </div>

            {data.findNewJobs != null ? (

                <div className={styles.jobList}>
                    {data.findNewJobs.map((job: any) => (
                        <div onClick={()=> toggleModal(job)} style={{background: `${job.colour}`}} className={styles.jobItem}>
                            <img className={styles.jobImage} src={job.image} />
                            <div className={styles.rightItems}>
                                <span className={styles.jobName}>{job.name}</span>
                                <span className={styles.avgHeader}>Average</span>
                                <span className={styles.avgPrice}>{props.formatter.format(job.average)}</span>
                            </div>
                        </div>
                    ))}
                </div>

            ) : (
                    <div className={styles.noJobs}>
                        <span className="material-icons">info</span>
                        <div>Unable to retrieve jobs!</div>
                    </div>
                )}

            
            <div ref={node}>
                <JobModal handler={closeModal} global={props} job={modalData}
                    options={{ display: displayModal }} />
            </div>


        </div>
    )
}