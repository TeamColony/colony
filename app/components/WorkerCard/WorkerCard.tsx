import styles from './worker.module.css'
import Router from 'next/router';

type Props = {
    worker?: any
}

export default function WorkerCard(props: Props) {

    return (
        <div className={`${styles.iChallenge} ${styles.myChallenge}`} onClick={() => { Router.push(`/workers/`.concat(props.worker!._id)) }}>
            <div className={styles.profileInfoContainer}>
                <img className={styles.profilePicture} src={props.worker?.image} />
                <div className={styles.profileText}>
                    <div className={styles.profileName}>{props.worker?.name}</div>

                    <div className={styles.starContainer}>
                        <img className={styles.star} src="/star.svg" />
                        <div className={styles.ratingText}>{props.worker?.rating}</div>
                        <span className={styles.circle}></span>
                    </div>
                </div>
            </div>

            {props.worker.jobs.length != 0 ? (
                
                <div className={styles.jobSection}>
                    {props.worker.jobs.slice(0, 2).map((job: any, i: number) => (
                        <div key={i} className={styles.jobRow}>
                            <img className={styles.workTypeImage} src={job.image} />
                            <div className={styles.jobDetails}>{job.name}</div>
                        </div>
                    ))}

                </div>
            ) : (
                    <div className={styles.noJobs}>
                        <span className="material-icons">info</span>
                        <div>No jobs yet!</div>
                    </div>
                )}

        </div>
    )
}