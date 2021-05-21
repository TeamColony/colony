import styles from './categoryscroll.module.css';
import popularJobs from '../../interfaces/popular';
import Router from 'next/router';
import Loading from '../../components/Loading';

import { useQuery, gql } from '@apollo/client';


export type job = {
    _id: string,
    name: string,
    image: string
  }

export default function CategoryScroll() {
    const jobs = gql`
    {
      findAllJobs{
        _id
        name
        image
      }
    }
 `;

 const {error, loading, data} = useQuery(jobs);

 if(loading) {return <Loading/>}
 if(error) {return <div>{error}</div>}

    return (
        <div className={styles.jobScroll}>
            {data.findAllJobs.map((item: any, i:number) => (
                <div key={i} onClick={() => { Router.push(`/categories/`.concat(item.name)) }} 
                   className={styles.jobItem}>
                    <img style={{ height: '75%' }} src={item.image} />
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    )
}