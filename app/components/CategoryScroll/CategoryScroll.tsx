import styles from './categoryscroll.module.css';
import popularJobs from '../../interfaces/popular';
import NavItem from '../NavBar/NavItem';

export default function CategoryScroll() {
    return (
        <div className={styles.jobScroll}>
            {popularJobs.map((item) => (
                <div className={styles.jobItem}>
                    <img style={{ height: '75%' }} src={item.image} />
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    )
}