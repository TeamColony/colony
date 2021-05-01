import styles from './worker.module.css'

type Props = {
    name?: string
    rating?: BigInt
    jobs?: []
}

const WorkerCard = (props: Props) => {

    return (
        <div className={`${styles.iChallenge} ${styles.myChallenge}`}>
            <div className={styles.profileInfoContainer}>
                <img className={styles.profilePicture} src="profile_pics/stark.png" />
                <div className={styles.profileText}>
                    <div className={styles.profileName}>Clide Calzone</div>
                    
                    <div className={styles.starContainer}>
                        <img className={styles.star} src="/star.svg"/>
                        <div className={styles.ratingText}>4.4</div>
                        <span className={styles.circle}></span>
                    </div>
                </div>
            </div>

            <div className={styles.jobSection}>
                <div className={styles.jobRow}>
                    <img className={styles.workTypeImage} src="/pizza.svg"/>
                    <div className={styles.jobDetails}>Food Delivery</div>
                </div>

                <div className={styles.jobRow}>
                    <img className={styles.workTypeImage} src="/collection.svg"/>
                    <div className={styles.jobDetails}>Collection</div>
                </div>
            </div>

        </div>
    )
}

export default WorkerCard