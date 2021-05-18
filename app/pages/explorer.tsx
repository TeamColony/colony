import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/explorer.module.css';
import CategoryScroll from '../components/CategoryScroll/CategoryScroll';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import QuickJobsCard from '../components/QjobsCard/quickJobs';
import WorkerCard from '../components/WorkerCard/WorkerCard';
import { useQuery, gql } from '@apollo/client';
import RequestModal from '../components/RequestModal/RequestModal';
import Loading from '../components/Loading';

export default function Explorer(props: any) {

    const node = React.createRef<HTMLInputElement>();

    const [displayModal, setDisplayModal] = useState(false);
    const [modalData, setModalData] = useState(false);

    const toggleModal = (job: any) => {
        setModalData(job);
        setDisplayModal(dt => dt ? false : true)
    }

    const closeModal = () => {
        setDisplayModal(dt => dt ? false : true)
    }

    const handleClickOutside = (e: any) => {
        if (node?.current?.contains(e.target)) {
            return;
        }

        setDisplayModal(false);
    };

    useEffect(() => {
        if (displayModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [displayModal]);

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

    const quickJobs = gql`
    {
        findQuickJobs(id: "${String(props.user.id)}") {
            _id
            image
            name
            workers{
                price
                user{
                _id,
                image,
                rating
                }
            }
                
        }
    }
    `;

    const queryMultiple = () => {
        const nearData = useQuery(nearWorkers);
        const jobData = useQuery(quickJobs);
        return [nearData, jobData];
    }

    const [
        { loading: loading1, data: near },
        { loading: loading2, data: quick }
    ] = queryMultiple()

    if (loading1 || loading2) {
        return <Loading/>
    }

    return (
        console.log(near),
        <div className={styles.parent}>
            <div className={styles.searchRow}>
                <div className={styles.search}>
                    <span className="material-icons">search</span>
                    <input placeholder="Search..." className={styles.searchInput} />
                </div>
            </div>
            <div className={styles.categoryRow}>
                <CategoryScroll />
            </div>
            <div className={styles.jobsRow}>
                <div className={styles.sectionHeader}>
                    <span className="material-icons">timelapse</span>
                    <h2>Quick Jobs</h2>
                </div>
                <Splide className={styles.splideComponent}
                    options={{
                        rewind: true,
                        pagination: false,
                        gap: "30px",
                        padding: "60px",
                        fixedWidth: "180px"
                    }}>

                    {quick.findQuickJobs.map((job: any, i: number) => (
                        <SplideSlide key={i} className={`${i == 1 && styles.firstSplide}`}>
                            <div onClick={() => toggleModal(job)}>
                                <QuickJobsCard global={props} job={job} />
                            </div>
                        </SplideSlide>
                    ))}

                </Splide>
            </div>
            <div className={styles.nearRow}>
                <div className={styles.sectionHeader}>
                    <span className="material-icons">location_pin</span>
                    <h2>Near you</h2>
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

                    {near.findNearWorkers.map((worker: any, i: number) => (
                        <SplideSlide key={i} className={`${i == 1 && styles.firstSplide}`}>
                            <WorkerCard worker={worker}></WorkerCard>
                        </SplideSlide>
                    ))}
                </Splide>

            </div>

            <div ref={node}>
                <RequestModal handler={closeModal} global={props} job={modalData}
                    options={{ display: displayModal }} />
            </div>

        </div>
    )
}