//Packages
import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Router from 'next/router';
import dynamic from 'next/dynamic'

//Styling
import styles from '../styles/index.module.css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "leaflet/dist/leaflet.css";

//Components
import WorkerCard from '../components/WorkerCard/WorkerCard';
import MessageCard from '../components/MessageCard/MessageCard';
import { User } from '../interfaces/index';
import Loading from '../components/Loading';

import { useQuery, gql, useLazyQuery } from '@apollo/client';
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
        findFirstMessage(id: "${String(props.user.id)}") {
          _id,
          users{
            name
            image
          }
            
      }
    }
  `;

  const nearWorkers = gql`
      {
        findNearWorkers(id: "${String(props.user.id)}") {
            _id,
            name,    
            image,
            rating,
            jobs{
                name,
                image
            }
        }
      }
  `;

  const queryMultiple = () => {
    const jobData = useQuery(jobs);
    const workerData = useQuery(nearWorkers);
    return [jobData, workerData];
  }

  const [getMessage, messages] = useLazyQuery(oneMessage)

  useEffect(() => {
    getMessage()
  }, [])

  const [
    { loading: loading1, data: popularjobs },
    { loading: loading3, data: workers }
  ] = queryMultiple()

  if (loading1 || loading3) {
    return <Loading />
  }

  if (popularjobs && messages && workers) {
     return (
      <div className={styles.indexBody}>
        <div className={styles.mapParent}>
          <div className={styles.popular}>
            <div className={styles.jobHeader}>
              <span className={`${styles.popularTitle} unselectable`}>Popular Jobs</span>
              <span onClick={() => { Router.push(`/explorer`) }}
                className={`${styles.popularAll} ${styles.unselectable}`}>View all</span>
            </div>
            <div className={styles.jobList}>
              {popularjobs.findAllJobs.map((job: job, i: number) => (
                <div key={i} onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.popularJob}>
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



        {messages.data && messages.data.findFirstMessage ? (
            <MessageCard options={{
              data: messages.data.findFirstMessage.users[0],
              navigation: {
                to: messages.data.findFirstMessage._id
              }
            }}/>
          ) : (
            <div className={styles.noMessages}>
              <span className="material-icons">info</span>
              <div>Uh oh... no new messages!</div>
            </div>
          )}

        <div className={styles.nearHeader}>
          <div className={styles.headerLeft}>
            <span className={`material-icons ${styles.navIcon}`}>location_pin</span>
            <div className={styles.navText}>Near You</div>
          </div>
        </div>

        {workers.findNearWorkers != null ? (
                <div>
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
                        <SplideSlide key={i} className={`${i == 1 && styles.firstSplide}`}>
                          <WorkerCard worker={worker}></WorkerCard>
                        </SplideSlide>
                      ))}
                    </Splide>
                </div>

              ) :
                (
                  <div className={styles.noMessages}>
                    <span className="material-icons">info</span>
                    <div>No jobs available right now!</div>
                  </div>
              )
          }

      
      </div>
    )
  }
}