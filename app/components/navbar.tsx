import { useState } from 'react'
import styles from '../styles/navbar.module.css'
import Router from 'next/router'

type Props = {
    data?: any 
}

function navbar(props: Props) {
    const [activePage, setActivePage] = useState("Home")

    function NavItem(props: Props) {
        return (
            <div>
                <div className={`${styles.middleOption} ${activePage == props.data.name ? `${styles.selectedOption}` : ""} noselect`}
                onClick={() => {
                    Router.push(`${props.data.route}`);
                    setActivePage(props.data.name);
                }}>

                    <span className="material-icons">{props.data.icon}</span>
                    <div className={styles.iconText}>
                        {props.data.name}
                    </div>
                </div>

            </div>
        )
    }

    if (true) {
        return (
            <div className={`${styles.nav} ${styles.sticky}`}>
                <div className={styles.leftNav}>
                    <img className={styles.adaLogo} src="/adaText.svg" />
                </div>
                <div className={styles.middleNav}>
                    <div className={styles.middleOptions}>

                        <NavItem data={{
                            name: "Home",
                            icon: "home",
                            route: "/",
                        }} />

                        <NavItem data={{
                            name: "Submissions",
                            icon: "school",
                            route: "/submission",
                        }} />

                        <NavItem data={{
                            name: "Settings",
                            icon: "settings",
                            route: "/settings",
                        }} />


                    </div>
                </div>
                <div className={styles.rightNav}>
                    <div onClick={() => Router.push(`/profiles/${props.globalProps.session.name.replace(" ", "_")}`)} className={`${styles.rightNavContainer}`}>
                        <img className={styles.navProfilePic} src={props.globalProps.session.picture} />
                        <text className={styles.navUserNameText}>{props.globalProps.session.name}</text>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default navbar