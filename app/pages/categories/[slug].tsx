import styles from '../../styles/categories.module.css';
import React from 'react';
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';

import {useState} from 'react';
import Loading from '../../components/Loading';

export default function Categories() {

    const [display, setDisplay] = useState(false)

    const router = useRouter();
    const { slug } = router.query

    const jobs = gql`
    {
      findOneJob(name: "${String(slug)}"){
        image,
        workers{
          user{
            name
            image
          }
        }
      }
    }
 `;

    const linearFade = (e: React.UIEvent<HTMLDivElement> & {target : HTMLDivElement}) => {
        if (e.target.scrollTop != 0 && !display) {
            setDisplay(true)
        } else if (e.target.scrollTop == 0) {
            setDisplay(false)
        }
    }

   const { loading, error, data } = useQuery(jobs);
   
   if (loading) return <Loading/>;
   if (error) return `Error! ${error.message}`;

    return (
        console.log(data),
        <div className={styles.parent}>
            <div className={styles.header}>
                <div className={styles.backContainer}>
                    <span onClick={() => Router.back()} className={`${styles.unselectable} material-icons`}>arrow_back</span>
                </div>
                <div className={styles.titleContainer}>
                    <img className={styles.jobImage} src={data.findOneJob.image}/>
                    <div>{slug}</div>
                </div>
            </div>
            <div className={styles.listContainer}>
                {display &&
                    <div className={styles.linearFade}/>
                }
                <div onScroll={linearFade} className={styles.scrollList}>
                    {data.findOneJob.workers.map((worker: any) => (
                        console.log(worker),
                        <div className={styles.listItem}>
                            <div className={styles.leftSide}>
                                <img className={styles.pfp} src={worker.user[0].image}/>
                                <div className={styles.pInfo}>
                                    <div>{worker.user[0].name}</div>
                                    <div className={styles.starContainer}>
                                        <img src="/star.svg"/>
                                        <div>4.4</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightSide}>
                                <div className={styles.statusCircle}/>
                                <div>Available</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}