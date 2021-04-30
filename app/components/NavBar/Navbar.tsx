import NavItem from './NavItem'
import styles from '../../styles/navbar.module.css'
import Router from 'next/router'
import { User } from '../../interfaces/index'

type Props = {
    data?: any,
    user: User,
    activePage: string
}

function navbar(props: Props) {
    return (
        <div className={`${styles.nav} ${styles.sticky}`}>
            <div className={styles.middleNav}>
                <div className={styles.middleOptions}>

                    <NavItem {...props} options={{
                        name: "Home",
                        key: "IndexPage",
                        icon: "home",
                        route: "/"
                    }} />

                    <NavItem {...props} options={{
                        name: "Explore",
                        key: "ExplorerPage",
                        icon: "explore",
                        route: "/submission",
                    }} />

                    <NavItem {...props} options={{
                        name: "Settings",
                        key: "SettingsPage",
                        icon: "settings",
                        route: "/settings",
                    }} />

                </div>
                <div onClick={() => Router.push(`/profiles/${props.user?.name.replace(" ", "_")}`)} className={`${styles.rightNavContainer}`}>
                    <img className={styles.navProfilePic} src={props.user?.picture} />
                    <text className={styles.navUserNameText}>{props.user?.name}</text>
                </div>
            </div>
        </div>
    )
}

export default navbar