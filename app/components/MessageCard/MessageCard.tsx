import React from 'react';
import styles from './messagecard.module.css';
import {User} from '../../interfaces/index'
import Router from 'next/router';

export type Props = {
    user: User
}

export default function MessageCard(props: any) {
    return (
        <div onClick={() => {Router.push(`/chat/${props.id}`)}} 
         className={`${styles.messageCard} ${styles.noMessages} `}>
            <img className={styles.profilePicture} src={props.user[0].image!} />
            <span>{props.user[0].name}</span>
            <div className={styles.messageEnd}>
                <span>0</span>
                <span className={`material-icons ${styles.messageIcon}`}>chat</span>
            </div>
        </div>
    )
}