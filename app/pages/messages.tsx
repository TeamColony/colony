import React from 'react';
import styles from '../styles/messages.module.css';

//Components
import MessageCard from '../components/MessageCard/MessageCard';
import userMessage from '../interfaces/messages'

const MessagePage = () => {
    return (
        <div className={styles.messageBody}>
            <div className={styles.messageHeader}>
                <div className={styles.leftHeader}>
                    <span className={`material-icons 
                        ${styles.navIcon}`}>chat</span>
                    <span className={styles.navTitle}>Messages</span>
                </div>

                <div className={styles.rightHeader}>
                    <span className={`material-icons 
                        ${styles.navIcon}`}>add_circle</span>
                </div>
            </div>

            {userMessage.map((message) => (
                <MessageCard message={message}></MessageCard>
            ))}
        </div>
    )
}

export default MessagePage