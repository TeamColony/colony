//Packages
import React from 'react';
import dynamic from "next/dynamic";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Router from 'next/router';

//Styling
import styles from '../styles/index.module.css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "leaflet/dist/leaflet.css";

//Components
import WorkerCard from '../components/WorkerCard/WorkerCard';
import MessageCard from '../components/MessageCard/MessageCard';
import { User } from '../interfaces/index';

import Loading from '../components/Loading';

import { useQuery, gql } from '@apollo/client';
const LeafletMap = dynamic(() => import("../components/Map"), { ssr: false });

export type job = {
  _id: string,
  name: string,
  image: string
}


type Props = {
  data?: any,
  user: User,
}

export default function IndexPage(props: Props) {
  const jobs = gql`
     {
       findAllJobs{
         _id
         name
         image
       }
     }
  `;

  const oneMessage = gql`
    {
        findOneMessage(id: "${String(props.user.id)}") {
          messages{
            _id
            user{
               name
               image
            }
          }
            
      }
    }
  `;
  
  const nearWorkers = gql`
      {
        findNearWorkers{
            _id
            name    
            image
            rating
        }
      }
  `;

  const queryMultiple = () => {
    const jobData = useQuery(jobs);
    const messageData = useQuery(oneMessage);
    const workerData = useQuery(nearWorkers);
    return [jobData, messageData, workerData];
  }

  const [
    { loading: loading1, data: popularjobs },
    { loading: loading2, data: messages },
    { loading: loading3, data: workers }
  ] = queryMultiple()

  if (loading1 || loading2 || loading3) {
    return <Loading/>
  }

  if (popularjobs && messages && workers) {

    console.log(workers);
    return (
      <div className={styles.indexBody}>
        <div className={styles.mapParent}>
          <div className={styles.popular}>
            <div className={styles.jobHeader}>
              <span className={`${styles.popularTitle} unselectable`}>Popular Jobs</span>
              <span onClick={() => { Router.push(`/explorer`)}}
              className={`${styles.popularAll} ${styles.unselectable}`}>View all</span>
            </div>
            <div className={styles.jobList}>
              {popularjobs.findAllJobs.map((job: job) => (
                <div onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.popularJob}>
                  <img className={styles.popularPicture} src={job.image} />
                  <span>{job.name}</span>
                </div>
              ))}
            </div>
          </div>
          <LeafletMap />
        </div>

        <div className={styles.messageHeader}>
          <div className={styles.headerLeft}>
            <span className={`material-icons ${styles.navIcon}`}>chat</span>
            <div className={styles.navText}>Messages</div>
          </div>

          <span onClick={() => { Router.push(`/messages`) }}
            className={`${styles.popularAll} ${styles.unselectable}`}>View all</span>
        </div>
        {/* {messages.findAllMessagesForUser.map((msg: any) => {
          <MessageCard user={msg.user.user[0]}></MessageCard>
        })} */}
        
        <MessageCard user={messages.findOneMessage.messages[0].user}></MessageCard>

        <div className={styles.nearHeader}>
          <div className={styles.headerLeft}>
            <span className={`material-icons ${styles.navIcon}`}>location_pin</span>
            <div className={styles.navText}>Near You</div>
          </div>
        </div>

        <Splide className={styles.splideComponent}
          options={{
            rewind: true,
            gap: '2rem',
            pagination: false,
            autoHeight: true,
            padding: "60px",
            fixedWidth: "285px",
          }}>

          {workers.findNearWorkers.map((worker: any, i: number) => (
            <SplideSlide className={`${i == 1 && styles.firstSplide}`}>
              <WorkerCard worker={worker}></WorkerCard>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    )
  }
}