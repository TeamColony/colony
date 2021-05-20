import styles from './review.module.css'

type Props = {
    picture?: string
    name?: string
    comment?: string
    rating?: number
}

const ReviewCard = ({options}: {options: Props}) => {
    console.log(options.picture)
    return (
        <div className={`${styles.reviewParent}`}>
            <div className={styles.profileInfoContainer}>
                <img className={styles.profilePicture} src={options.picture} />
                <div className={styles.profileText}>
                    <div className={styles.profileName}>{options.name}</div>
                </div>
            </div>

            <div>
                <div className={styles.reviewRow}>
                    <div className={styles.reviewDetails}>
                        {options.comment}
                    </div>
                </div>

                <div className={styles.starContainer}>
                    {Array(options.rating).fill(0).map(() => (
                        <img className={styles.star} src="/star.svg"/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard