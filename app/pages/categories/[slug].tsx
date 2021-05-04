import styles from '../../styles/categories.module.css';

import {useState, useEffect} from 'react';

export default function Categories() {

    const [display, setDisplay] = useState(false)

    const linearFade = (e) => {
        if (e.target.scrollTop != 0 && !display) {
            setDisplay(true)
        } else if (e.target.scrollTop == 0) {
            setDisplay(false)
        }
    }

    return (
        <div className={styles.parent}>
            <div className={styles.header}>
                <div className={styles.backContainer}>
                    <span className="material-icons">arrow_back</span>
                </div>
                <div className={styles.titleContainer}>
                    <img src="/pizza.svg"/>
                    <div>Pizza</div>
                </div>
            </div>
            <div className={styles.listContainer}>
                {display &&
                    <div className={styles.linearFade}/>
                }
                <div onScroll={linearFade} className={styles.scrollList}>
                    {[1,2,3,4,5,6,7,8,9,1].map(() => (
                        <div className={styles.listItem}>
                            <div className={styles.leftSide}>
                                <img className={styles.pfp} src="/profile_pics/stark.png"/>
                                <div className={styles.pInfo}>
                                    <div>Clide Calzone</div>
                                    <div className={styles.starContainer}>
                                        <img src="/star.svg"/>
                                        <div>4.4</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightSide}>
                                <div className={styles.statusCircle}/>
                                <div>Available</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}