import styles from '../styles/navbar.module.css'

type Props = {
    name?: string
    rating?: BigInt
    jobs?: []
}

const WorkerCard = (props: Props) => {

    return (

        <img className={styles.adaLogo} src="logo.svg" />

    )
}

export default WorkerCard