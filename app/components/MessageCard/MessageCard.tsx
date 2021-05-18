import React from 'react';
import styles from './messagecard.module.css';
import {User} from '../../interfaces/index'
import Router from 'next/router';

export type Props = {
    data: User
}

export default function MessageCard(props: any) {

    console.log(props);

    return (
        <div>
        {props.data.users != null ? (
                <div onClick={() => {Router.push(`/chat/`.concat(props.data._id))}} 
                    className={`${styles.messageCard} ${styles.noMessages} `}>
                    <img className={styles.profilePicture} src={props.data.users[0].image!} />
                    <span>{props.data.users[0].name}</span>
                    <div className={styles.messageEnd}>
                        <span>0</span>
                        <span className={`material-icons ${styles.messageIcon}`}>chat</span>
                    </div>
                </div>
                ): (
                <div className={styles.noMessages2}>
                    <span className="material-icons">info</span>
                    <div>Uh oh... user not found!</div>
                  </div>
         )}
        </div>
       
        
    )
}