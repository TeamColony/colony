import styles from './review.module.css'

type Props = {
    name?: string
    rating?: number
    stars?: number
}

const ReviewCard = (props: Props) => {

    return (
        <div className={`${styles.reviewParent}`}>
            <div className={styles.profileInfoContainer}>
                <img className={styles.profilePicture} src="../profile_pics/stark.png" />
                <div className={styles.profileText}>
                    <div className={styles.profileName}>Liam Debell</div>
                </div>
            </div>

            <div>
                <div className={styles.reviewRow}>
                    <div className={styles.reviewDetails}>
                        Clide was able to collect my medicine
                        right on time before my meal!
                    </div>
                    
                </div>

                <div className={styles.starContainer}>
                        {[1,2,3,4,5].map(() => (
                                 <img className={styles.star} src="/star.svg"/>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard