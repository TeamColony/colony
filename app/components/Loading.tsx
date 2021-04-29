import React from 'react'
import styles from '../styles/component/loading.module.css'

export default class Loading extends React.Component {
    render() {
        return (
            <div className={styles.parent}>
                <div className={`${styles["lds-ellipsis"]}`}><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}