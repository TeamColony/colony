import React, { useEffect, useState } from 'react';
import Router from 'next/router'
import styles from './ongoing.module.css';
import { useLazyQuery, gql, useMutation } from '@apollo/client';

function OnGoing(props: any) {

    const [visible, setVisible] = useState(true);

    //Obtain user requests for worker

    const findUserRequests = gql`
    {
        findOngoing(id: "${String(props.user.id)}") {
            _id
            user{
                _id
            },
            job{
                name,
                image
            },
            worker{
                _id
            }      
        }
    }
    `

    const [getRequests, requestData] = useLazyQuery(findUserRequests)

    //Send user to chatroom

    const messageUserMutation = gql`
        mutation JoinChat($users: [String]) {
            joinChat(users: $users) {
                _id
            }
        }
    `
    const dismissModal = ()=> {
        localStorage.setItem('show', 'false');
        setVisible(false);
    }

    const [startMessage, startMessageResponse] = useMutation(messageUserMutation)

    useEffect(() => {
        getRequests();
    }, [])

    useEffect(() => {
        if (startMessageResponse.data) {
            Router.push(`/chat/${startMessageResponse.data.joinChat._id}`)
        }
    }, [startMessageResponse]);

    return (
        <div>
            {requestData.data && visible == true ? (
                <div>
                    {requestData.data.findOngoing.length != 0 ? (
                        props.margin('150px'),

                        <div className={styles.onBody}>
                            <div className={styles.onHeader}>
                                <div>
                                    <span className="material-icons">work_outline</span>
                                    <div>Ongoing Job</div>
                                </div>
                                <div onClick={()=> dismissModal()} className={styles.headerRight}>
                                    <span>Dismiss</span>
                                </div>
                            </div>

                            <div className={styles.separator}></div>

                            <div className={styles.onMain}>
                                <div className={styles.bodyLeft}>
                                    <img className={styles.jobImage} src='./pizza.svg'></img>
                                    <span>Takeaway</span>
                                </div>

                                <div onClick={() => startMessage({
                                    variables: {
                                        "users": [String(props.user.id), String(requestData.data.findOngoing[0].worker._id)],
                                    }
                                })} className={styles.bodyRight}>
                                    <span className="material-icons">chat</span>
                                    <div className={styles.messageText}>Message</div>
                                </div>
                            </div>

                        </div>
                    ) : (props.margin('150px'),
                        null
                        )}
                </div>
            ) : (
                    props.margin('0px'),
                    null
                )}

        </div>

    );
}

export default OnGoing;