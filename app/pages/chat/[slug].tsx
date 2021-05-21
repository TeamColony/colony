import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../styles/chat.module.css';
import Router from 'next/router';
import {SocketCtx} from '../../context/socket'
import BottomModal from '../../components/BottomModal/BottomModal'
import {Types} from 'mongoose'

import {useLazyQuery, gql, useMutation} from '@apollo/client'

interface userData {
    name: string,
    image: string,
}

interface message {
    [k: string] : {
        user: string,
        message: string
    }
}

export default function Chat(props: any) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLSpanElement>(null);
    const messageInput = useRef<HTMLInputElement>(null);
    const Socket = useContext(SocketCtx)

    const [messages, appendMessage] = useState<message[] | any>({});
    const [userData, setUserData] = useState<Array<userData>>(Object);

    const [displayModal, setDisplayModal] = useState(false);

    const msgQuery = gql`
    {
        findChatInfo(id: "${props.router.query.slug}") {
            users{
                _id
                name
                image
            }
            messages{
                id
                user
                message
            }
        }
    }
    `

    const clearMsg = gql`
        mutation {
            clearMessageHistory(id:"${props.router.query.slug}")
        }
    `

    const leaveChatMutation = gql`
        mutation {
            leaveChat(id: "${props.user.id}", chatid: "${props.router.query.slug}")
        }
    `

    const [getHistory, {loading, data}] = useLazyQuery(msgQuery)

    const  [clearHistory, clearResponse] = useMutation(clearMsg)

    const [leaveChat, leaveResponse] = useMutation(leaveChatMutation)

    useEffect(() => {
        if (leaveResponse.data && leaveResponse.data.leaveChat) {
            Router.push('/')
        }
    }, [leaveResponse])

    useEffect(() => {
        if (data) {
            appendMessage(
                data.findChatInfo.messages.reduce((map: any, obj: any) => {
                    map[obj.id] = { msg: obj.message, user: obj.user }
                    return map
                }, {})
            );
            setUserData(data!.findChatInfo.users.filter((item:any) => props.user.id !== item._id));
        }
    }, [data])


    useEffect(() => {
        const scroll = bottomRef.current!.scrollHeight - bottomRef.current!.clientHeight;
        bottomRef.current!.scrollTo({top: scroll, behavior: 'smooth'});
    }, [messages])


    useEffect(() => {
        Socket.emit('joinRoom', {chat: props.router.query.slug})

        Socket.on('joined', (status) => {
            if (!status.success) {
                Router.back();
            } else {
                getHistory()
            }
        })

        Socket.on('failure', (error) => {
            console.log(error)
        })

        Socket.on('success', (data) => {
            appendMessage((latest: any) => {
                let buf = latest[data.id.toString()]
                buf.delivered = true;
                return {...latest, [data.id.toString()] : buf}
            })
        })

        Socket.on('message', (data) => {
            appendMessage((msg: any) => {
                return {...msg, data}
            })
        })

        return () => {
            Socket.emit('leaveChat')
        }

    }, [])


    const HandleSend = () => {
        if (messageInput.current && messageInput.current.value != '') {
            const id = Types.ObjectId()
            Socket.emit('send', {roomName: props.router.query.slug, text: messageInput.current.value, id: id})
            appendMessage((msg: message) => {
                let curMsg = messageInput.current?.value
                messageInput.current!.value = '';
                return {...msg, [id.toString()] : { user: props.user.id, msg: curMsg, id: id, delivered: false }}
            })
        }
    }



    const toggleModal = () => {
        setDisplayModal(dt => dt ? false : true)
    }

    const handleLeave = () => {
        leaveChat()
    }

    const handleClear = () => {
        clearHistory()
        getHistory()
    }

    return (
        <div className={styles.chatGrid}>
            <div className={styles.navContainer}>
                <div className={styles.chatNav}>
                    <div className={styles.leftNav}>
                        <span onClick={() => Router.back()} className={`${styles.unselectable} material-icons`}>arrow_back_ios_new</span>
                        
                        {userData[0] != null ? (
                            <div className={styles.userInfo}>
                              <img className={styles.popularPicture} src={userData[0].image} />
                              <span>{userData[0].name}</span>
                            </div>
                        ) : (
                            <div></div>
                        )}
                      

                    </div>
                    <div className={styles.rightNav}>

                        <span ref={toggleRef} onClick={toggleModal} className={`unselectable material-icons`}>more_horiz</span>
                    </div>
                </div>
            </div>
            <div ref={bottomRef} className={styles.messageContainer}>
                <div id="messageContainer" className={styles.messages}>
                    {Object.keys(messages).map((msg: string, i: number) => (
                        <div className={`${styles.msgContainer} ${messages[msg].user != props.user.id ? styles.otherUser : ''}`}>
                            <span key={i} >{messages[msg].msg}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
            <div className={`${styles.chatBox} ${styles.flexBox}`}>
                <div className={styles.boxLeft}>
                        <span className={`material-icons`}>chat_bubble_outline</span>
                        <input autoComplete="off" type="text" onKeyDown={(e) => e.key === 'Enter' && HandleSend()} ref={messageInput} id="message" placeholder="Send a message..." required />
                    </div>
                    <div className={styles.boxRight}>
                        <div className={`${styles.addButton} material-icons`}>add</div>
                    </div>
                </div>

                <span onClick={HandleSend} className={`material-icons ${styles.sendIcon}`}>send</span>
            </div>          
                <BottomModal options={{initialDisplay: displayModal, toggle: setDisplayModal, toggles: [toggleRef]}}>
                    <div className={styles.buttonList}>
                        <button onClick={handleClear} className={styles.clearBtn}>Clear Chat</button>
                        <button onClick={handleLeave} className={styles.leaveBtn}>Leave Chat</button>
                    </div>
                </BottomModal>
        </div>
    )
};