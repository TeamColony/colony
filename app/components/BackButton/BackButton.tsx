import React from 'react';
import styles from './backbutton.module.css';
import Router from 'next/router';

export default function BackButton() {
    return (
        <span onClick={() => Router.back()} className={`${styles.unselectable} material-icons`}>arrow_back</span>
    )
}