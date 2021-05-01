//Packages
import React from 'react';
import dynamic from "next/dynamic";
import { Splide, SplideSlide } from '@splidejs/react-splide';

//Styling
import styles from '../styles/index.module.css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "leaflet/dist/leaflet.css";

//Components
import WorkerCard from '../components/WorkerCard/WorkerCard';
import { map } from 'leaflet';
const LeafletMap = dynamic(() => import("../components/Map"), { ssr: false });

let nearYou: Array<Object> = [
  {
    name: "Clide Calzone",
    rating: 4.4,
    jobs: ["Food Delivery", "Collection"]
  },
  {
    name: "Tina Gotschi",
    rating: 5,
    jobs: ["Food Delivery", "Collection", "Dry Cleaning", "Babysitting", "Teaching"]
  },
]

const position: number[] = [51.505, -0.09]

const IndexPage = () => {

  return (
    <div className={styles.indexBody}>

      <div className={styles.mapParent}>
          <LeafletMap/>
      </div>

      <div className={styles.nearHeader}>
           <span className={`material-icons ${styles.navIcon}`}>chat</span>
           <div className={styles.navText}>Messages</div>
      </div>

      <div className={`${styles.messageCard}`}>
          <img className={styles.profilePicture} src="profile_pics/grey.png" />
          <span>James McDaniel</span>
          <div className={styles.messageEnd}>
            <span>1</span>
            <span className={`material-icons ${styles.messageIcon}`}>chat</span>
          </div>
      </div>

      <div className={styles.nearHeader}>
           <span className={`material-icons ${styles.navIcon}`}>location_pin</span>
           <div className={styles.navText}>Near You</div>
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

        <SplideSlide className={styles.firstSplide}>
          <WorkerCard></WorkerCard>
        </SplideSlide>

        <SplideSlide>
          <WorkerCard></WorkerCard>
        </SplideSlide>
        
        <SplideSlide>
          <WorkerCard></WorkerCard>
        </SplideSlide>

      </Splide>
    </div>
  )
}

export default IndexPage
