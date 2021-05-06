import styles from './categoryscroll.module.css';
import popularJobs from '../../interfaces/popular';
import Router from 'next/router';

export default function CategoryScroll() {
    return (
        <div  onClick={() => {Router.push(`/categories/1`)}} 
            className={styles.jobScroll}>
            {popularJobs.map((item) => (
                <div className={styles.jobItem}>
                    <img style={{ height: '75%' }} src={item.image} />
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    )
}