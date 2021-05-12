import styles from '../../styles/navbar.module.css';
import Router from 'next/router';

interface options {
    name: string,
    icon: string,
    route: string
}

export default function NavItem({options, activePage} : {options: options, activePage: string}) {
    console.log(activePage);
    return (
        <div>
            <div className={`${styles.middleOption} ${activePage === options.route && styles.selectedOption} noselect unselectable`} 
                    onClick={() => {Router.push(`${options.route}`)}}>

                <span className="material-icons">{options.icon}</span>
                
                <div className={styles.iconText}>
                    {options.name}
                </div>
            </div>
        </div>
    )
}