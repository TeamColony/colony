import styles from './categoryscroll.module.css';

export default function CategoryScroll() {
    return (
        <div className={styles.jobScroll}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                <div className={styles.jobItem}>
                    <img style={{ height: '75%' }} src="/pizza.svg" />
                    <div>delivery</div>
                </div>
            ))}
        </div>
    )
}