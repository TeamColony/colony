import React, { useRef, useState, useEffect } from 'react';

//Packages
import Router from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';

//Styles
import styles from '../styles/hive.module.css';

//Components
import RequestCard from '../components/RequestCard/RequestCard';
import Loading from '../components/Loading';

export default function Hive(props: any) {

    const findUserJobs = gql`
    {
         findUserJobs(id: "${String(props.user.id)}") {
             _id,
             name,
             image,
             workers{
                 price,
                 type
             }
         }
    }
    `;

    const removeJobMutation = gql`
        mutation removeJobMutation($input: jobInput!){
            removeJob(input: $input)
        }
    `

    const [remove] = useMutation(removeJobMutation);

    const findUserRequests = gql`
    {

        findUserRequests(id: "${String(props.user.id)}") {
            _id
            user{
                name,
                image
            },
            job{
                name,
                image
            },
            address,
            status,
            request
                    
        }
    }
    `

    const modalRef = React.useRef<HTMLDivElement>(null);

    const priceInput = useRef<HTMLInputElement>(null);
    const [colour, setColour] = useState("#B8B8B8");

    const [item, setItem] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handleClickOutside = (e: any) => {
        if (modalRef?.current?.contains(e.target)) {
            return;
        }

        setConfirm(false);
    };

    useEffect(() => {
        if (confirm == true) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [confirm]);

    const changeType = (event: any) => {
        //todo: Do something
    }

    const onChange = (e: any) => {
        const re = /^[0-9\b.]+$/;

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

    const [
        { loading: loading1, data: jobs, refetch: getjobs },
        { loading: loading2, data: requests }
    ] = queryMultiple()

    const selectJob = (key: any) => {
        if (key == item) {
            setItem(null);
        } else {
            setItem(key);
        }
    }

    const deleteJob = () => {

        remove({
            variables: {
                "input": {
                    "id": String(jobs.findUserJobs[item!]._id),
                    "user": String(props.user.id)
                }
            }
        });

        setConfirm(false);
        setItem(null);
        getjobs();
    }

    if (loading1 || loading2) {
        return <Loading />
    }

    return (
        <div className={styles.parent}>

            <div className={styles.delete} style={{ opacity: confirm ? 1 : 0.3 }}>
                {confirm == true ? (
                    <div className={styles.deleteBody}>
                        <div ref={modalRef} className={styles.deleteCard}>
                            <div className={styles.deleteHeader}>
                                <span className={`${styles.headerIcon} material-icons`}>warning</span>
                                <div className={styles.confirmationText}>Are you sure you want to delete this job?</div>
                            </div>
                            <div className={styles.deleteMain}>
                                <div className={styles.mainLeft}>
                                    <img src={jobs.findUserJobs[item!].image}></img>
                                    <span>{jobs.findUserJobs[item!].name}</span>
                                </div>

                                <div className={styles.mainRight}>
                                    <span>{props.formatter.format(jobs.findUserJobs[item!].workers[0].price)}</span>
                                </div>
                            </div>
                            <div className={styles.deleteBottom}>
                                <div onClick={() => setConfirm(false)} className={styles.cancelButton}>
                                    <span>CANCEL</span>
                                </div>
                                <div onClick={deleteJob} className={styles.deleteButton}>
                                    <span>DELETE</span>
                                </div>
                            </div>

                        </div>

                    </div>
                ) : (
                        null
                    )}
            </div>

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

                    <div className={styles.information} style={{ height: item != null ? '170px' : '0px', 
                            opacity: item != null ? 1: 0.0, marginBottom: item != null ? '10px': '0px' }}>

                        {item != null ? (

                            <div className={styles.jobDetails}>
                                <div className={styles.detailsHeader}>
                                    <div className={styles.headerLeft}>
                                        <img src={jobs.findUserJobs[item!].image}></img>
                                        <span>{jobs.findUserJobs[item!].name}</span>
                                    </div>
                                    <div onClick={() => setConfirm(true)} className={styles.headerRight}>

                                        <span className={`material-icons`}>delete</span>
                                        <div>Delete</div>
                                    </div>
                                </div>

                                <div className={styles.inputSection}>
                                    <div className={styles.inputBox} style={{ border: `solid ${colour}` }}>
                                        <span className={`${styles.unselectable} material-icons`}>payments</span>
                                        <input ref={priceInput} autoComplete="off" id="price" onChange={onChange} className={styles.infoInput}
                                            placeholder={props.formatter.format(jobs.findUserJobs[item!].workers[0].price)}></input>
                                    </div>

                                    <div className={styles.inputBox} style={{ border: `solid #B8B8B8` }}>
                                        <span className={`${styles.unselectable} material-icons`}>category</span>
                                        <input autoComplete="on" id="address" className={styles.infoInput} placeholder="hourly"></input>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <></>
                            )}
                    </div>

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
                    <div>
                        {requests.findUserRequests[0] != null ? (
                            <div >
                                {requests.findUserRequests.map((request: any, key: Number) => (
                                    <RequestCard key={key} request={request} />
                                ))}
                            </div>
                        ): (<div className={styles.noRequests}>
                                <span className="material-icons">info</span>
                                <div>Could not load request!</div>
                            </div>)}

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