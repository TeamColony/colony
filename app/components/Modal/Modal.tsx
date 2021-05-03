import styles from './modal.module.css';

interface props {
    visible: boolean
}

export default function Modal({options}: {options: props}) {
    if (options.visible) {
        return (
            <div className={styles.dimmed}>
                <div>
                    center
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}