import React from 'react';
import styles from './messagecard.module.css';
import {User} from '../../interfaces/index'
import Router from 'next/router';

export type Props = {
    data: User
}

export default function MessageCard(props: any) {

    return (
        <div onClick={() => {Router.push(`/chat/`.concat(props.data._id))}} 
         className={`${styles.messageCard} ${styles.noMessages} `}>
            <img className={styles.profilePicture} src={props.data.users[0].image!} />
            <span>{props.data.users[0].name}</span>
            <div className={styles.messageEnd}>
                <span>0</span>
                <span className={`material-icons ${styles.messageIcon}`}>chat</span>
            </div>
        </div>
    )
}