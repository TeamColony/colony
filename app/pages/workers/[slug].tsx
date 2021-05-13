//Packages
import React from 'react';
import { GetServerSidePropsContext } from 'next';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQuery, gql, useMutation } from '@apollo/client';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Router, {useRouter} from 'next/router'

//Styles
import styles from '../../styles/workerProfile.module.css';

//Components
import BackButton from '../../components/BackButton/BackButton';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

export default function WorkerProfile(props: any) {
    const router = useRouter();
    const { slug } = router.query

    const getUser = gql`
    {
      findUserByID(id: "${String(slug)}"){
        name,
        image,
        rating
      }
    }
 `;

   const findUserJobs = gql`
   {
        findUserJobs(id: "${String(slug)}") {
            name
            image
        }
   }
   `;

   const messageUserMutation = gql`
    mutation {
        joinChat(users: ["${props.user.id}", "${String(slug)}"])
    }
   `

    const [startMessage, startMessageResponse] = useMutation(messageUserMutation)

   const queryMultiple = () => {
      const userData = useQuery(getUser);
      const jobData = useQuery(findUserJobs);
      return [userData, jobData];
   }

    const [
        { loading: loading1, data: user },
        { loading: loading2, data: jobs }
    ] = queryMultiple()

    if (loading1 || loading2) {
        return <div>loading</div>
    }

    const messageUser = () => {
        startMessage()
    }

    return (
        console.log(jobs),
        <div className={styles.parent}>
            <div className={styles.headerContent}>
                <BackButton/>
                <div className="unselectable">Worker Profile</div>
                <div onClick={messageUser} className={styles.sendMsgContainer}>
                    <span className="material-icons">send</span>
                </div>
            </div>

            <div className={styles.bodyContent}>
                <div className={styles.profileInfoContainer}>
                    <img className={styles.profilePicture} src={user.findUserByID.image} />
                    <div className={styles.profileText}>
                        <div className={styles.profileName}>{user.findUserByID.name}</div>
                        <div className={`${styles.workerStatus} unselectable`}>Avaliable</div>
                        <div className={styles.starContainer}>
                            <img style={{ marginRight: 0 }} src="/star.svg" />
                            <div className={styles.ratingText}>{user.findUserByID.rating}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.jobsContainer}>
                    <div className={`${styles.jobsHeader} unselectable`}>
                        <span className="material-icons">work_outline</span>
                        <div style={{ fontWeight: 500 }}>Jobs Available</div>
                    </div>
                    <div className={styles.jobScroll}>
                        {jobs.findUserJobs.map((job: any) => (
                            <div onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.jobItem}>
                                <img className={styles.jobImage} src={job.image} />
                                <div>{job.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <div className={`${styles.jobsHeader} ${styles.reviewsHeader} unselectable`}>
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