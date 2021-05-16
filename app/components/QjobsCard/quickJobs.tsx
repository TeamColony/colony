import styles from './quickjobs.module.css';

export default function QuickJobsCard(props: any) {
    return (
        <div className={styles.cardBody}>
            <div className={styles.header}>
                <img src={props.job.image} />
                <div>{props.job.name}</div>
            </div>
            <div className={styles.priceContainer}>
                <h2>{props.global.formatter.format(props.job.workers[0].price)} p/h</h2>
            </div>
            <div className={styles.userPfpList}>
                <img className={styles.pfp} src={props.job.workers[0].user[0].image} />
                <img className={styles.star} src="/star.svg" />
                <div className={styles.ratingText}>{props.job.workers[0].user[0].rating}</div>

            </div>
        </div>
    )
}