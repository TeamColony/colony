import React from 'react';
import styles from './messagecard.module.css';
import {Message} from '../../interfaces/messages'
import Router from 'next/router';

export type Props = {
    messages: Message
}

export default function MessageCard(props: any) {
    return (
        <div onClick={() => {Router.push(`/chat/1`)}} 
         className={`${styles.messageCard} ${props.message.unread === 0 && styles.noMessages} `}>
            <img className={styles.profilePicture} src="profile_pics/grey.png" />
            <span>{props.message.name}</span>
            <div className={styles.messageEnd}>
                <span>{props.message.unread}</span>
                <span className={`material-icons ${styles.messageIcon}`}>chat</span>
            </div>
        </div>
    )
}