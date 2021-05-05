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
    console.log(props.user)
    return (
        <div className={`${styles.nav} ${styles.sticky}`}>
            <div className={styles.middleNav}>

            <img className={styles.logo} src="/notext.svg" />
                
                <div className={styles.middleOptions}>

                    <NavItem {...props} options={{
                        name: "Home",
                        icon: "home",
                        route: "/"
                    }} />

                    <NavItem {...props} options={{
                        name: "Explore",
                        icon: "explore",
                        route: "/explorer",
                    }} />

                    <NavItem {...props} options={{
                        name: "Settings",
                        icon: "settings",
                        route: "/settings",
                    }} />

                    <div></div>

                </div>

                <div onClick={() => Router.push(`/profiles/${props.user?.name.replace(" ", "_")}`)} className={`${styles.rightNavContainer}`}>
                    <img className={styles.navProfilePic} src={props.user?.picture || props.user.image} />
                    <text className={styles.navUserNameText}>{props.user?.name}</text>
                </div>
            </div>
        </div>
    )
}


export default navbar