//Packages
import React, { useEffect, useState, useRef } from 'react';
import { GetServerSidePropsContext } from 'next';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQuery, gql, useMutation } from '@apollo/client';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Router, { useRouter } from 'next/router'

//Styles
import styles from '../../styles/workerProfile.module.css';

//Components
import BackButton from '../../components/BackButton/BackButton';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import BottomModal from '../../components/BottomModal/BottomModal';

interface stars {
    selected: boolean
}

export default function WorkerProfile(props: any) {
    const router = useRouter();
    const { slug } = router.query

    const toggleRef = useRef<HTMLDivElement>(null);
    const [modalOpen, toggleModal] = useState<Boolean>(false);
    const [stars, setStars] = useState<number>(1);

    const [reviewsState, setReviews] = useState<any[any]>();

    const commentRef = useRef<HTMLTextAreaElement>(null);

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
        joinChat(users: ["${props.user.id}", "${String(slug)}"]) {
            _id
        }
    }
   `

   const canUserReview = gql`
    {
        canUserReview(id: "${props.user.id}", worker: "${String(slug)}")
    }
   `

   const getReviews = gql`
    {
        findReviewsForProfile(id: "${String(slug)}") {
            by {
                _id
                name
                image
            }
            comment
            rating
        }
    }
   `

    const createUserReview = gql`
    mutation AddReview($data: reviewInput!) {
        createReviewForWorker(data: $data)   
    }`

    const [startMessage, startMessageResponse] = useMutation(messageUserMutation)
    const [createReview, reviewResponse] = useMutation(createUserReview)

    useEffect(() => {
        if (startMessageResponse.data) {
            Router.push(`/chat/${startMessageResponse.data.joinChat._id}`)
        }
    }, [startMessageResponse])

   const queryMultiple = () => {
      const userData = useQuery(getUser);
      const jobData = useQuery(findUserJobs);
      const canReview = useQuery(canUserReview);
      const reviews = useQuery(getReviews)
      return [userData, jobData, canReview, reviews];
   }

    const [
        { loading: loading1, data: user },
        { loading: loading2, data: jobs },
        { loading: loading3, data: canReview },
        { loading: loading4, data: reviews }
    ] = queryMultiple()

    useEffect(() => {
        console.log(reviewsState)
    }, [reviewsState])

    useEffect(() => {
        if (reviews != undefined && reviews.findReviewsForProfile) {
            setReviews(reviews)
        }
    }, [reviews])

    if (loading1 || loading2) {
        return <div>loading</div>
    }

    const messageUser = () => {
        startMessage()
    }


    const ReviewUser = () => {
        console.log("toggling")
    }

    
    const handleReviewStar = (v: number) => {
        setStars(v + 1)
    }

    const handleCreateReview = () => {
        if (commentRef.current!.value.length > 0 && commentRef.current!.value.length < 100) {
            createReview({variables: {
                data: {
                    by: props.user.id,
                    user: slug,
                    comment: commentRef.current!.value,
                    rating: stars
                }
            }})
            setReviews((prev: any) => {
                let test = [...prev.findReviewsForProfile, { by: props.user, comment: commentRef.current!.value, rating: stars }]
                prev.findReviewsForProfile = test
                return prev
            })
        }
    }
    
    return (
        <div className={styles.parent}>
            <div className={styles.headerContent}>
                <BackButton />
                <div className="unselectable">Worker Profile</div>
                <div className={styles.right}>
                    {!loading3 && canReview.canUserReview &&  
                        <div ref={toggleRef} style={{marginRight: '0.2rem'}} onClick={ReviewUser} className={`unselectable ${styles.sendMsgContainer}`}>
                            <span className="material-icons">star</span>
                        </div>
                    }
                    <div onClick={messageUser} className={`unselectable ${styles.sendMsgContainer}`}>
                        <span className="material-icons">send</span>
                    </div>
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

                    {jobs.findUserJobs.length != 0 ? (
                        <div className={styles.jobScroll}>
                            {jobs.findUserJobs.map((job: any) => (
                                <div onClick={() => { Router.push(`/categories/`.concat(job.name)) }} className={styles.jobItem}>
                                    <img className={styles.jobImage} src={job.image} />
                                    <div>{job.name}</div>
                                </div>
                            ))}
                        </div>

                    ) : (
                            <div className={styles.noJobs}>
                                <span className="material-icons">info</span>
                                <div>Oops... no jobs yet!</div>
                            </div>
                        )}


                </div>
                <div className={styles.reviewsContainer}>
                    <div className={`${styles.jobsHeader} ${styles.reviewsHeader} unselectable`}>
                        <span className="material-icons">star_border</span>
                        <div style={{ fontWeight: 500 }}>Reviews</div>
                    </div>

                </div>
                {!loading4 && reviewsState && (reviewsState as any).findReviewsForProfile.length > 0 ?
                
                    <Splide className={styles.splideComponent}
                        options={{
                            rewind: true,
                            pagination: true,
                            padding: "30px",
                            gap: "100px",
                            arrows: false,
                            autoplay: true
                        }}>

                        {reviews.findReviewsForProfile.map((r: any) => (
                            <SplideSlide>
                                <ReviewCard options={{
                                    picture: r.by.image,
                                    name: r.by.name,
                                    rating: r.rating,
                                    comment: r.comment
                                }}/>
                            </SplideSlide>
                        ))}

                    </Splide>
                : 
                    <div className={`${styles.noJobs} ${styles.noReviews}`}>
                        <span className="material-icons">face_retouching_natural</span>
                        <div>Oops... no reviews yet!</div>
                    </div>
                }

            </div>
            {!loading3 && canReview.canUserReview &&
                <BottomModal options={{
                    initialDisplay: modalOpen,
                    toggle: toggleModal,
                    toggles: [toggleRef],
                    height: '26rem'
                }}>
                    <div className={styles.modalGrid}>
                        <div className={styles.modalHeading}>
                            <img className={styles.modalPfp} src={user.findUserByID.image}/>
                            <span>{user.findUserByID.name}</span>
                        </div>
                        <div className={styles.modalInput}>
                            <div className={styles.inputRow}>
                                <span>Comment</span>
                                <textarea ref={commentRef} className={styles.modalComment} placeholder="Enter your thoughts here.">

                                </textarea>
                            </div>

                            <div className={styles.inputRow}>
                                <span>Rating</span>
                                <div className={styles.modalStars}>
                                    {[1,2,3,4,5].map((i, v) => {
                                        return (
                                            <span style={{color: i <= stars ? '#F0D162' : '#B2B2B2' }} onClick={() => handleReviewStar(v)} className="material-icons">star</span>
                                        )}
                                    )}
                                </div>
                            </div>
                        </div>
                        <div onClick={handleCreateReview} className={styles.submitReview}>
                            <span className="material-icons">verified</span>
                            <span>submit</span>
                        </div>
                    </div>
                </BottomModal>
            }
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