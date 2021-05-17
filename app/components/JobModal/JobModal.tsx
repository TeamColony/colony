import React, { useRef, useState } from 'react';
import styles from './jobModal.module.css';
import { gql, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic'
import "leaflet/dist/leaflet.css";
const LeafletMap = dynamic(() => import("../../components/Map"), { ssr: false });


export default function JobModal(props: any) {

    const [jobType, setType] = useState("");
    const [colour, setColour] = useState("#B8B8B8");

    const priceInput = useRef<HTMLInputElement>(null);

    const addJobMutation = gql`
        mutation addJobMutation($input: userInput!){
            addJob(input: $input)
        }
    `

    const [add] = useMutation(addJobMutation);

    //todo: Change this based on type select data

    const changeType = (event: any) => {
        setType(event.toDate())
    }

    const onChange = (e: any) => {
        const re = /^[0-9\b.]+$/;
        console.log(e.target.value.length);
        if(e.target.value.length < 6){}

        if (e.target.value === '' || re.test(e.target.value) 
                && e.target.value.length < 6) {
            setColour("#B8B8B8")
         } else{
            setColour("#FF8888")
         }
    }

    const createRequest = () => {

        if (priceInput.current != null &&
            priceInput.current.value != ""){



            add({
                variables: {
                    "input": {
                        "id": String(props.job._id),
                        "user": String(props.global.user.id),
                        "price": parseFloat(priceInput?.current!.value),
                        "type": 0
                    }
                }
            }); //todo: change to jobType
        }

        props.handler();
    }

    return (
        <div style={{ height: props.options.display ? '440px' : 0 }} className={styles.parent}>
            <div className={styles.requestBody}>
                <div className={styles.requestBottom}>
                    <div className={styles.requestDetails}>
                        <div className={styles.detailsLeft}>
                            <img className={styles.jobPicture} src={props.job.image} />
                            <span>{props.job.name}</span>
                        </div>

                        {props.job ? (
                            <span className={styles.detailsRight}>Avg. {props.global.formatter.format(props?.job?.average)} p/h</span>
                        ) : (
                                <div></div>
                            )}

                    </div>

                    <div className={styles.map}>
                        <LeafletMap />
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputBox} style={{border: `solid ${colour}`}}>
                            <span className={`${styles.unselectable} material-icons`}>payments</span>
                            <input ref={priceInput} autoComplete="off" id="price" onChange={onChange} className={styles.infoInput} prefix="£" placeholder="Price..."></input>
                        </div>

                        <div className={styles.inputBox} style={{border: `solid #B8B8B8`}}>
                            <span className={`${styles.unselectable} material-icons`}>category</span>
                            <input autoComplete="on" id="address" className={styles.infoInput} placeholder="Type"></input>
                        </div>
                    </div>

                </div>

                <div onClick={createRequest} className={styles.requestButton}>
                    <span className={`${styles.unselectable} material-icons`}>new_releases</span>
                    <span>Add New Job!</span>
                </div>
            </div>
        </div>
    )
}