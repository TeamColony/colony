import React, { useRef, useState } from 'react';
import modalstyle from './requestmodal.module.css'
import styles from '../../styles/requests.module.css';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { gql, useMutation } from '@apollo/client'

export default function requestModal(props: any) {

    const [datePicked, setDate] = useState("");
    const [timePicked, setTime] = useState("");

    const requestInput = useRef<HTMLTextAreaElement>(null);
    const addressInput = useRef<HTMLInputElement>(null);

    const createRequestMutation = gql`
        mutation CreateRequest($input: requestInput!){
            createRequest(input: $input){
                _id
            }
        }
    `

    const [create] = useMutation(createRequestMutation)

    const changeDate = (event: any) => {
        //console.log(event.toDate())
        //console.log(event.format("DD-MM-YYYY"))
        setDate(event.toDate())
    }

    const changeTime = (event: any) => {
        //console.log(event.format("HH-mm-ss a"))
        setTime(event.toDate())
    }

    const createRequest = () => {
        if (requestInput.current && requestInput.current.value != ''
            && addressInput.current) {

            create({variables: {
              "input":{
                "worker": props.job.workers[0].user[0]._id,
                "job": props.job._id,
                "user": props.global.user.id,
                "request": requestInput.current.value,
                "address": addressInput.current.value,
                "time": String(datePicked),
                "status": 0
            }}});

            props.handler();
        }
    }

    return (
        <div style={{ height: props.options.display ? '30rem' : 0 }} className={modalstyle.parent}>
            <div className={styles.requestBody}>
                <div className={styles.requestBottom}>
                    <div className={styles.requestDetails}>
                        <div className={styles.detailsLeft}>
                            <img className={styles.jobPicture} src={props.job.image} />
                            <span>{props.job.name}</span>
                        </div>

                        {props.job ? (
                            <span className={styles.detailsRight}>{props.global.formatter.format(props?.job?.workers[0]?.price)} p/h</span>
                        ) : (
                            <div></div>
                        )}
                        
                    </div>

                    <div className={styles.requestBox}>
                        <textarea autoComplete="false" ref={requestInput} id="request" placeholder="Type your request here..."></textarea>
                    </div>

                    <div className={styles.inputBox}>
                        <span className={`${styles.unselectable} material-icons`}>room</span>
                        <input autoComplete="on" ref={addressInput} id="address" className={styles.infoInput} placeholder="Your address..."></input>
                    </div>

                    <div className={styles.requestTime}>
                        <div className={`${styles.inputBox} ${styles.timeLeft}`}>
                            <span className={`${styles.unselectable} material-icons`}>date_range</span>
                            <Datetime timeFormat={false} onChange={changeDate} className={styles.datePicker} inputProps={{ placeholder: "Job Day" }} />
                        </div>

                        <div className={`${styles.inputBox} ${styles.timeRight}`}>
                            <span className={`${styles.unselectable} material-icons`}>schedule</span>
                            <Datetime dateFormat={false} onChange={changeTime} className={styles.timePicker} inputProps={{ placeholder: "Time" }} />
                        </div>
                    </div>

                </div>

                <div onClick={createRequest} className={styles.requestButton}>
                    <span className={`${styles.unselectable} material-icons`}>campaign</span>
                    <span>Request Job</span>
                </div>
            </div>
        </div>
    )
}