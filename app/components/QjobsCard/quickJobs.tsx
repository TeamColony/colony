import styles from './quickjobs.module.css';

export default function QuickJobsCard() {
    return (
        <div className={styles.cardBody}>
            <div className={styles.header}>
                <img src="/pizza.svg"/>
                <div>Collection</div>
            </div>
            <div className={styles.priceContainer}>
                <h2>£4.50 p/h</h2>
            </div>
            <div className={styles.userPfpList}>
                {[1,2,3].map((i, k) => (
                    <div>
                        <img key={k} className={styles.pfp} src="/profile_pics/stark.png"/>
                    </div>
                ))}
            </div>
        </div>
    )
}