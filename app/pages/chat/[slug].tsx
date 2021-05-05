import React from 'react';
import styles from '../../styles/chat.module.css';
import Router from 'next/router';

export default function Chat() {
    return (
        <div className={styles.chatBody}>

            <div className={styles.chatNav}>
                <div className={styles.leftNav}>
                    <span onClick={() => Router.back()} className={`${styles.unselectable} material-icons`}>arrow_back_ios_new</span>
                    <img className={styles.popularPicture} src='/profile_pics/grey.png' />
                    <span>James McDaniel</span>

                </div>
                <div className={styles.rightNav}>

                    <span className={`material-icons`}>more_horiz</span>
                </div>
            </div>

            <div className={styles.messages}>

                <span>Is everything oki?</span>
                <span>I saw that you weren't able to pick up my order yet!</span>
                <span className={styles.otherUser}>Sorry mate, running a bit late, should be there soon!</span>

            </div>

            <div className={`${styles.chatBottom} ${styles.flexBox}`}>
                <div className={`${styles.chatBox} ${styles.flexBox}`}>
                    <div className={styles.boxLeft}>
                        <span className={`material-icons`}>chat_bubble_outline</span>
                        <input id="message" type="text" placeholder="Send a message..." required />
                    </div>
                    <div className={styles.boxRight}>
                        <div className={`${styles.addButton} material-icons`}>add</div>
                    </div>
                </div>

                <span className={`material-icons`}>send</span>
            </div>

        </div>
    )
};