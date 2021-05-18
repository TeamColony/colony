import React from 'react';
import styles from './messagecard.module.css';
import {User} from '../../interfaces/index'
import Router from 'next/router';

type Callback = {
    arg: string,
    function: Function
}

export type Options = {
    data: User,
    navigation?: {
        [to: string] : string
    },
    callBack?: Callback
}

export default function MessageCard({options} : {options: Options}) {

    const HandleBehaviour = () => {
        if (options.navigation) {
            Router.push(`/chat/${options.navigation.to}`)
        } else if (options.callBack) {
            options.callBack.function(options.callBack.arg)
        } else {
            return   
        }
    }

    return (
        <div onClick={HandleBehaviour} className={`${styles.messageCard} ${styles.noMessages} `}>
            <img className={styles.profilePicture} src={options.data.image} />
            <span>{options.data.name}</span>
            <div className={styles.messageEnd}>
                <span>0</span>
                <span className={`material-icons ${styles.messageIcon}`}>chat</span>
            </div>
        </div>
    )


}