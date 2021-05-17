
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from '../styles/messages.module.css';
import messages from '../components/MessageCard/messagecard.module.css';
import chat from '../styles/chat.module.css';

import { User } from '../interfaces/index';
import { useQuery, gql } from '@apollo/client';

type Props = {
    data?: any,
    user: User,
}


const vanishValue = 200

const variants = {
  enter: (direction: any) => {
    return {
      x: direction > 0 ? vanishValue : -vanishValue,
      opacity: 0
    };
  },
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1
  },
  exit: (direction: any) => {
    return {
      zIndex: -4,
      x: direction < 0 ? vanishValue : -vanishValue,
      opacity: 0
    };
  }
};



function ChatScreen(props: any) {

    return (
        <div className={chat.chatGrid}>
            <div className={chat.navContainer}>
                <div className={chat.chatNav}>
                    <div className={chat.leftNav}>
                        <span onClick={() => props.func(-1)} className={`${chat.unselectable} material-icons`}>arrow_back_ios_new</span>
                        <img className={chat.popularPicture} src={props.user.image} />
                        <span>{props.user.name}</span>

                    </div>
                    <div className={chat.rightNav}>

                        <span className={`material-icons`}>more_horiz</span>
                    </div>
                </div>
            </div>
            <div className={chat.messageContainer}>
                <div className={chat.messages}>
                    <span>Is everything oki?</span>
                    <span>I saw that you weren't able to pick up my order yet!</span>
                    <span className={chat.otherUser}>Sorry mate, running a bit late, should be there soon!</span>
                </div>
            </div>
            <div className={chat.inputContainer}>
            <div className={`${chat.chatBox} ${chat.flexBox}`}>
                <div className={chat.boxLeft}>
                        <span className={`material-icons`}>chat_bubble_outline</span>
                        <input id="message" type="text" placeholder="Send a message..." required />
                    </div>
                    <div className={chat.boxRight}>
                        <div className={`${chat.addButton} material-icons`}>add</div>
                    </div>
                </div>

                <span className={`material-icons`}>send</span>
            </div>
        </div>
    )
}

function MessageList(props: any) {
    const jobs = gql`
        {
            findAllMessages(id: "${props.global.user.id}") {
                _id
                users {
                _id
                name
                image
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(jobs);
    if(loading){
        return (<>Loading</>)
    }


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

            {data.findAllMessages.map((message: any) => {
                return message.users.map((user: any) =>(
                    <div onClick={() => props.global.router.push(`/chat/${message._id}`)} 
                    className={`${messages.messageCard} ${messages.noMessages} `}>
                        <img className={messages.profilePicture} src={user.image} />
                        <span>{user.name}</span>
                        <div className={messages.messageEnd}>
                            <span>0</span>
                            <span className={`material-icons ${messages.messageIcon}`}>chat</span>
                        </div>
                    </div>
                ))
            })}
        </div>
    )
}

export default function MessagePage(props: Props) {
    
    const [direction, setDirection] = useState(0);
    const [selectedUser, setSelectedUser] = useState(0);
  
    const [data, setData] = useState(0);
  
    const paginate = (newDirection: any, key: any, data: any) => {
      setSelectedUser(key);
      setData(data);
  
      if (direction <= 0) {
      }
      if (newDirection == 1 && direction == 1) {

      } else {
        setDirection(newDirection)
      }
    };
  
    return (
      <div className={styles.mainContent}>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              style={{ width: "100%", position: "absolute", zIndex: -1, display: "flex", flexDirection: "column", gap: "1.4rem", marginRight: "2rem" }}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {direction <= 0 ? 
                  <MessageList paginate={paginate} func={paginate} global={props}/>
               
                  : <ChatScreen user={selectedUser} global={props} func={paginate} />}
  
            </motion.div>
          </AnimatePresence>
      </div>
    )
  }