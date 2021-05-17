
import React, { useEffect, useState } from 'react';
import styles from '../styles/messages.module.css';
import messages from '../components/MessageCard/messagecard.module.css';

import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

export default function MessageList(props: any) {
    const jobs = gql`
        {
            findAllMessages(id: "${props.user.id}") {
                _id
                users {
                _id
                name
                image
                }
            }
        }
    `;

    const messagesPos = gql`
        {
            findAllPosMessages(id: "${props.user.id}") {
                _id
                name
                image
            }
        }
    `

    const messageUserMutation = gql`
        mutation JoinChat($user: String) {
            joinChat(users: ["${props.user.id}", $user]) {
                _id
            }
        }
    `


    const [startMessage, startMessageResponse] = useMutation(messageUserMutation)

    const { loading, error, data } = useQuery(jobs);

    const [getPosMsg, getPosMsgData] = useLazyQuery(messagesPos);

    const startMsg = (id: String) => {
        startMessage({variables: {user: id}})
    }

    useEffect(() => {
        if (startMessageResponse.data) {
            props.router.push(`/chat/${startMessageResponse.data.joinChat._id}`)
        }
    }, [startMessageResponse])

    useEffect(() => {
        console.log("rendering")
        getPosMsg();
    }, [])

    const [showNewUsers, setNewUsers] = useState(false)

    if(loading){
        return (<>Loading</>)
    }

    if (showNewUsers && getPosMsgData.data) {
        return (
            <div className={styles.newParent}>
                <div className={styles.newHeader}>
                    <span onClick={() => setNewUsers(false)} className={`${styles.backBtnNew} material-icons`}>arrow_back_ios_new</span>
                    <span>New Message</span>
                </div>
                <div className={styles.list}>
                    {(getPosMsgData as any).data.findAllPosMessages.map((user: any) => (
                        <div onClick={() => startMsg(user._id)} className={`${messages.messageCard} ${messages.noMessages} `}>
                                <img className={messages.profilePicture} src={user.image} />
                                <span>{user.name}</span>
                                <div className={messages.messageEnd}>
                                    <span>0</span>
                                    <span className={`material-icons ${messages.messageIcon}`}>chat</span>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.messageBody}>
            <div className={styles.messageHeader}>
                <div className={styles.leftHeader}>
                    <span onClick={() => props.router.push('/')} className="material-icons">arrow_back_ios_new</span>
                    <span className={`material-icons 
                        ${styles.navIcon}`}>chat</span>
                    <span className={styles.navTitle}>Messages</span>
                </div>
                <div className={styles.rightHeader}>
                    <span onClick={() => setNewUsers(v => {
                        getPosMsg();
                        return v ? false : true
                    })} className={`material-icons 
                        ${styles.navIcon}`}>add</span>
                </div>
            </div>

            {data.findAllMessages.map((message: any) => {
                return message.users.map((user: any) =>(
                    <div onClick={() => props.router.push(`/chat/${message._id}`)} 
                    className={`${messages.messageCard} ${messages.noMessages} `}>
                        <img className={messages.profilePicture} src={user.image} />
                        <span>{user.name}</span>
                        <div className={messages.messageEnd}>
                            <span>0</span>
                            <span className={`material-icons ${messages.messageIcon}`}>chat</span>
                        </div>
                    </div>
                ))
            })}
        </div>
    )
}
