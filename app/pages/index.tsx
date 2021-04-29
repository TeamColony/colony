import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide/src/js';

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
    
    /*<Splide
      options={{
        rewind: true,
        perPage: 2,
        perMove: 1,
        gap: '1rem',
      }}
    

      {nearYou.map((worker, index) => (
        <div key={index}>
          <SplideSlide key={index}>

            <text>Hello</text>
          </SplideSlide>
        </div>
      ))}

    </Splide>*/
    <div>
      Homepage
    </div>
  )
}

export default IndexPage
