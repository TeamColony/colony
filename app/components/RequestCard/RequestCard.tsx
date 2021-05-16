import React from 'react';
import styles from './request.module.css';

export default function RequestCard(props: any){
    return(
        <div className={styles.requestCard}>
            <div className={styles.requestHeader}>
                <div className={styles.leftHeader}>
                    <img src={props.request.user.image}></img>
                    <span>{props.request.user.name}</span>
                </div>

                <div className={styles.rightHeader}>
                    <span>1</span>
                    <span className="material-icons">waving_hand</span>
                </div>

            </div>

            <span className={styles.requestText}>{props.request.request}</span>
            
            <hr className={styles.separator}></hr>

            <div className={styles.distance}>
                <span className="material-icons">location_pin</span>
                <span>{props.request.address}</span>
            </div>

            <div className={styles.requestBottom}>
                <div className={styles.leftBottom}>
                    <div>
                        <span className="material-icons">thumb_up</span>
                    </div>

                    <div>
                        <span className="material-icons">thumb_down</span>
                    </div>
                </div>

                <div className={styles.rightBottom}>
                    <img src={props.request.job.image}></img>
                    <span>{props.request.job.name}</span>
                </div>

            </div>
        </div>

    )
}