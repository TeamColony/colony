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
import nearYou from '../interfaces/worker';
import popularJobs from '../interfaces/popular';
import MessageCard from '../components/MessageCard/MessageCard';
import userMessages from '../interfaces/messages';
const LeafletMap = dynamic(() => import("../components/Map"), { ssr: false });

const IndexPage = () => {

  return (
    <div className={styles.indexBody}>
      <div className={styles.mapParent}>
        <div className={styles.popular}>
          <div className={styles.jobHeader}>
            <span className={styles.popularTitle}>Popular Jobs</span>
            <span className={`${styles.popularAll} ${styles.unselectable}`}>View all</span>
          </div>
          <div className={styles.jobList}>
              {popularJobs.map((job) => (
                  <div onClick={() => {Router.push(`/categories/1`)}} className={styles.popularJob}>
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
       
        <span onClick={() => {Router.push(`/messages`)}}
            className={`${styles.popularAll} ${styles.unselectable}`}>View all</span>
      </div>

      <MessageCard message={userMessages[0]}></MessageCard>

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

        {nearYou.map((worker, i) => (
            <SplideSlide className={`${i == 1 && styles.firstSplide}`}>
                <WorkerCard worker={worker}></WorkerCard>
            </SplideSlide>                    
        ))}
      </Splide>
    </div>
  )
}

export default IndexPage
