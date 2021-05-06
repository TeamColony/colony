import React from 'react';

import styles from '../../styles/workerProfile.module.css';
import { GetServerSidePropsContext } from 'next';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import ReviewCard from '../../components/ReviewCard/ReviewCard';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Router from 'next/router'

export default function WorkerProfile(props: any) {
    return (
        <div className={styles.parent}>
            <div className={styles.headerContent}>
                <span onClick={() => Router.back()} className="material-icons">arrow_back</span>
                <div>Worker Profile</div>
            </div>

            <div className={styles.bodyContent}>
                <div className={styles.profileInfoContainer}>
                    <img className={styles.profilePicture} src={props.user?.picture || props.user.image} />
                    <div className={styles.profileText}>
                        <div className={styles.profileName}>{props.user.name}</div>
                        <div className={styles.workerStatus}>Avaliable</div>
                        <div className={styles.starContainer}>
                            <img style={{ marginRight: 0 }} src="/star.svg" />
                            <div className={styles.ratingText}>4.4</div>
                        </div>
                    </div>
                </div>
                <div className={styles.jobsContainer}>
                    <div className={styles.jobsHeader}>
                        <span className="material-icons">work_outline</span>
                        <div style={{ fontWeight: 500 }}>Jobs Available</div>
                    </div>
                    <div className={styles.jobScroll}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                            <div className={styles.jobItem}>
                                <img style={{ height: '75%' }} src="/pizza.svg" />
                                <div>delivery</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <div className={`${styles.jobsHeader} ${styles.reviewsHeader}`}>
                        <span className="material-icons">star_border</span>
                        <div style={{ fontWeight: 500 }}>Reviews</div>
                    </div>

                </div>

                <Splide className={styles.splideComponent}
                    options={{
                        rewind: true,
                        pagination: true,
                        padding: "30px",
                        gap: "100px",
                        arrows: false,
                        autoplay: true
                    }}>

                    <SplideSlide>
                        <ReviewCard></ReviewCard>
                    </SplideSlide>

                    <SplideSlide>
                        <ReviewCard></ReviewCard>
                    </SplideSlide>

                    <SplideSlide>
                        <ReviewCard></ReviewCard>
                    </SplideSlide>

                </Splide>


            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let userID = context.query.slug
    return {
        props: {

        }
    }
}