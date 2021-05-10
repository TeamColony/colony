import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../styles/chat.module.css';
import Router from 'next/router';
import {SocketCtx} from '../../context/socket'

export default function Chat(props: any) {

    const bottomRef = useRef<HTMLDivElement>(null);

    const messageInput = useRef<HTMLInputElement>(null);
    const Socket = useContext(SocketCtx)

    const [messages, appendMessage] = useState<object[]>([])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    useEffect(() => {
        Socket.emit('joinRoom', {chat: props.router.query.slug})

        Socket.on('joined', (status) => {
            if (!status.success) {
                Router.back();
            }
        })

        Socket.on('failure', (error) => {
            console.log(error)
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
            Socket.emit('send', {roomName: props.router.query.slug, text: messageInput.current.value})
            appendMessage(msg => {
                let curMsg = messageInput.current?.value
                messageInput.current!.value = '';
                return [...msg, {user: props.user.id, message: curMsg}]
            })
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
                    {messages.map((msg: any, i: number) => (
                        <span key={i} className={msg.user != props.user.id ? styles.otherUser : ''}>{msg.message}</span>
                    ))}
                    <p ref={bottomRef}/>
                </div>
            </div>
            <div className={styles.inputContainer}>
            <div className={`${styles.chatBox} ${styles.flexBox}`}>
                <div className={styles.boxLeft}>
                        <span className={`material-icons`}>chat_bubble_outline</span>
                        <input onKeyDown={(e) => e.key === 'Enter' && HandleSend()} ref={messageInput} id="message" type="text" placeholder="Send a message..." required />
                    </div>
                    <div className={styles.boxRight}>
                        <div className={`${styles.addButton} material-icons`}>add</div>
                    </div>
                </div>

                <span onClick={HandleSend} className={`material-icons ${styles.sendIcon}`}>send</span>
            </div>
        </div>
    )
};