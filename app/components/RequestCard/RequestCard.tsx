import React, { useState } from 'react';
import styles from './request.module.css';
import { gql, useMutation } from '@apollo/client';
import { ifError } from 'assert';

export default function RequestCard(props: any) {

    const updateRequestStatus = gql`
        mutation statusMutation($input: updateRequest!){
            updateStatus(input: $input)
        }
    `

    const [update] = useMutation(updateRequestStatus);
    const [shown, setShown] = useState(true);
    const [currentStatus, setStatus] = useState(props.request.status);

    if (props.request == null) {
        return (<></>)
    }

    const updateStatus = (id: any, status: Number, key: Number) => {

        update({
            variables: {
                "input": {
                    "id": String(id),
                    "status": status
                }
            }
        }).then(data => {
            console.log(data.data.updateStatus);
            if (data.data.updateStatus) {
                if (status == 2) {
                    //setShown(false);
                }
            }
            setStatus(status);
        })

    }

    return (
        <div>
            {shown == true ? (
                <div className={styles.requestCard} style={{ border: currentStatus == 1 ? 'solid #73C2A6 3px' : currentStatus == 2 ? '2px solid #EF8080' : '2px solid #8d86c9' }}>
                    <div className={styles.requestHeader}>
                        <div className={styles.leftHeader}>
                            <img src={props.request.user.image}></img>
                            <span>{props.request.user.name}</span>
                        </div>

                        <div className={styles.rightHeader}>
                            <span>{props.request.status}</span>
                            <span className="material-icons">waving_hand</span>
                        </div>

                    </div>

                    <span className={styles.requestText}>{props.request.request}</span>

                    <hr style={{ borderTop: currentStatus == 1 ? '2px solid #73C2A6' : currentStatus == 2 ? '2px solid #EF8080' : '2px solid #9e98d0'}} className={styles.separator}></hr>

                    <div className={styles.distance}>
                        <span className="material-icons">location_pin</span>
                        <span>{props.request.address}</span>
                    </div>

                    <div className={styles.requestBottom}>
                        <div className={styles.leftBottom}>
                            {currentStatus == 1 ? (
                                <div className={styles.upStatus}>
                                    <span className="material-icons">thumb_up</span>
                                </div>
                            ) : (<div onClick={() => updateStatus(props.request._id, 1, props.key)}
                                className={styles.thumbsUp}>
                                <span className="material-icons">thumb_up</span>
                            </div>)}

                                <div onClick={() => updateStatus(props.request._id, 2, props.key)} className={styles.thumbsDown}>
                                    <span className="material-icons">thumb_down</span>
                                </div>
                            
                        

                        </div>

                        <div className={styles.rightBottom}>
                            <img src={props.request.job.image}></img>
                            <span>{props.request.job.name}</span>
                        </div>

                    </div>
                </div>
            ) : (
                    null
                )}
        </div>



    )
}