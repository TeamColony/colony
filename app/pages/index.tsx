import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import styles from '../styles/index.module.css'
import WorkerCard from '../components/WorkerCard';

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

const IndexPage = () => {
  return (
    <div>
      <div>Near You</div>
      <Splide
        options={{
          rewind: true,
          gap: '1rem',
        }}>

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
