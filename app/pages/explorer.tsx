import styles from '../styles/explorer.module.css';
import CategoryScroll from '../components/CategoryScroll/CategoryScroll';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import QuickJobsCard from '../components/QjobsCard/quickJobs';
import WorkerCard from '../components/WorkerCard/WorkerCard'

export default function Explorer() {
    return (
        <div className={styles.parent}>
            <div className={styles.searchRow}>
                <div className={styles.search}>
                    <span className="material-icons">search</span>
                    <input placeholder="Search..." className={styles.searchInput}/>
                </div>
            </div>
            <div className={styles.categoryRow}>
                <CategoryScroll/>
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
                        padding: "25px",
                        arrows: false,
                        fixedWidth: "180px"
                    }}>

                    <SplideSlide>
                        <QuickJobsCard/>
                    </SplideSlide>

                    <SplideSlide>
                        <QuickJobsCard/>
                    </SplideSlide>

                    <SplideSlide>
                        <QuickJobsCard/>
                    </SplideSlide>

                </Splide>
            </div>
            <div className={styles.nearRow}>
                <div className={styles.sectionHeader}>
                    <span className="material-icons">location_pin</span>
                    <h2>Near you</h2>
                </div>
                <Splide style={{marginBottom: '4rem'}} className={styles.splideComponent}
                    options={{
                        rewind: true,
                        pagination: false,
                        gap: "30px",
                        padding: "25px",
                        arrows: false,
                        fixedWidth: "285px",
                    }}>

                    <SplideSlide>
                        <WorkerCard/>
                    </SplideSlide>
                    <SplideSlide>
                        <WorkerCard/>
                    </SplideSlide>
                    <SplideSlide>
                        <WorkerCard/>
                    </SplideSlide>

                </Splide>

            </div>
        </div>
    )
}