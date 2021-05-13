import styles from './bottomModal.module.css'

export default function bottomModal(props: any) {
    return (
        <div style={{height: props.options.display ? '16rem' : 0}} className={styles.parent}>
            {props.children}
        </div>
    )
}