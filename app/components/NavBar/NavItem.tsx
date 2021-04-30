import styles from '../../styles/navbar.module.css';
import Router from 'next/router';

interface options {
    name: string,
    key: string,
    icon: string,
    route: string
}

export default function NavItem({options, activePage} : {options: options, activePage: string}) {
    return (
        <>
            <div className={`${styles.middleOption} ${activePage === options.key && styles.selectedOption} noselect`} onClick={() => {Router.push(`${options.route}`)}}>

                <span className="material-icons">{options.icon}</span>
                
                <div className={styles.iconText}>
                    {options.name}
                </div>
            </div>
        </>
    )
}