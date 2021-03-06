import styles from './bottomModal.module.css'
import React, { useEffect, useState } from 'react'

export default function bottomModal(props: any) {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const listener = (e: MouseEvent) => {
        const path = (e as any).path || (e.composedPath && e.composedPath())
        props.options.toggle((prev: boolean) => {
            if (props.options.untoggles) {
                if (props.options.untoggles.filter((el: any) => Array.from(el.current.children).includes(e.target) || el.current == e.target).length > 0) {
                    return false
                }
            }
            if (props.options.toggles.filter((el: any) => Array.from(el.current.children).includes(e.target) || el.current == e.target
            ).length > 0) {
                return true
            }
            if (path.includes(modalRef.current)) {
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
        <div ref={modalRef} style={{height: props.options.initialDisplay ? props.options.height || '16rem' : 0}} className={styles.parent}>
            {props.children}
        </div>
    )
}