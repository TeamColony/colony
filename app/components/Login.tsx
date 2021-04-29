import {signIn} from 'next-auth/client'
import styles from '../styles/Login.module.css'

export default function Login() {
    return (
        <div className={`${styles.parent} ${styles.contentContainer}`}>
            <img src="/logo2.svg" className={styles.logoContainer}/>
            <div className={styles.bottomContainer}>
                <img className={styles.googleIcon} src="/googleIcon.svg"/>
                <div className={styles.optionsContainer}>
                    <button onClick={() => signIn('google')} className={styles.loginBtn}>LOG IN</button>
                    <button onClick={() => signIn('google')} className={styles.registerBtn}>REGISTER</button>
                </div>
            </div>
        </div>
    )
}