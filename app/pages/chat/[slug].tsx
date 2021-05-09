import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../styles/chat.module.css';
import Router from 'next/router';
import {SocketCtx} from '../../context/socket'

export default function Chat(props: any) {

    const messageInput = useRef<HTMLInputElement>(null);
    const Socket = useContext(SocketCtx)

    const [messages, appendMessage] = useState<object[]>([])


    useEffect(() => {
        Socket.emit('joinRoom', {chat: props.router.query.slug, user: props.user.id})

        Socket.on('joined', (data) => {
            console.log(data)
        })

        Socket.on('message', (data) => {
            console.log(data)
            appendMessage(msg => [...msg, data])
        })

        return () => {
            Socket.emit('leaveChat')
        }
    }, [])


    const HandleSend = () => {
        if (messageInput.current) {
            console.log("sending")
            Socket.emit('send', {roomName: props.router.query.slug, text: messageInput.current.value, user: props.user.id})
            // appendMessage(msg => [...msg, {user: props.user.id, message: messageInput.current?.value}])
        }
    }

    return (
        <div className={styles.chatGrid}>
            <div className={styles.navContainer}>
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
            </div>
            <div className={styles.messageContainer}>
                <div id="messageContainer" className={styles.messages}>
                    {messages.map((msg: any) => (
                        <span className={msg.user != props.user.id ? styles.otherUser : ''}>{msg.message}</span>
                    ))}
                    {/* <span>Is everything oki?</span>
                    <span>I saw that you weren't able to pick up my order yet!</span>
                    <span className={styles.otherUser}>Sorry mate, running a bit late, should be there soon!</span> */}
                </div>
            </div>
            <div className={styles.inputContainer}>
            <div className={`${styles.chatBox} ${styles.flexBox}`}>
                <div className={styles.boxLeft}>
                        <span className={`material-icons`}>chat_bubble_outline</span>
                        <input ref={messageInput} id="message" type="text" placeholder="Send a message..." required />
                    </div>
                    <div className={styles.boxRight}>
                        <div className={`${styles.addButton} material-icons`}>add</div>
                    </div>
                </div>

                <span onClick={HandleSend} className={`material-icons`}>send</span>
            </div>
        </div>
    )

    // return (
    //     <div className={styles.chatBody}>




    //         <div className={`${styles.chatBottom} ${styles.flexBox}`}>

    //         </div>

    //     </div>
    // )
};