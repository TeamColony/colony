import styles from './bottomModal.module.css'
import React, { useEffect, useState } from 'react'

export default function bottomModal(props: any) {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const listener = (e: MouseEvent) => {
        props.options.toggle((prev: boolean) => {
            if (props.options.toggles.filter((el: any) => el.current == e.target).length > 0) {
                return true
            }
            if ((e as any).path.includes(modalRef.current)) {
                return true
            } else {
                return false
            }
        })
    }

    useEffect(() => {

        window.addEventListener("click", listener)

        return (() => {
            window.removeEventListener("click", listener)
        })

    }, [])

    return (
        <div ref={modalRef} style={{height: props.options.initialDisplay ? '16rem' : 0}} className={styles.parent}>
            {props.children}
        </div>
    )
}