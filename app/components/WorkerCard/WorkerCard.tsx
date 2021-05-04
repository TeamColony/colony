import styles from './worker.module.css'
import Router from 'next/router';
import {Worker} from '../../interfaces/worker';

type Props = {
    worker?: Worker
}

export default function WorkerCard(props: Props){

    return (
        <div className={`${styles.iChallenge} ${styles.myChallenge}`} onClick={() => {Router.push(`/workers/1`)}}>
            <div className={styles.profileInfoContainer}>
                <img className={styles.profilePicture} src={props.worker?.picture} />
                <div className={styles.profileText}>
                    <div className={styles.profileName}>{props.worker?.name}</div>
                    
                    <div className={styles.starContainer}>
                        <img className={styles.star} src="/star.svg"/>
                        <div className={styles.ratingText}>{props.worker?.rating}</div>
                        <span className={styles.circle}></span>
                    </div>
                </div>
            </div>

            <div className={styles.jobSection}>
                <div className={styles.jobRow}>
                    <img className={styles.workTypeImage} src="/pizza.svg"/>
                    <div className={styles.jobDetails}>{props.worker?.jobs[0]}</div>
                </div>

                <div className={styles.jobRow}>
                    <img className={styles.workTypeImage} src="/collection.svg"/>
                    <div className={styles.jobDetails}>{props.worker?.jobs[1]}</div>
                </div>
            </div>

        </div>
    )
}