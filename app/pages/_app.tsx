import { useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import Layout from '../components/Layout'
import Login from '../components/Login'

import '../styles/global.css';

export default function App(props: any) {
    const {Component, router} = props;

    const standalone = ['/workers/[slug]']

    const [session, loading] = useSession();

    return (
        <>
            {session?
                <Layout useNav={standalone.includes(router.pathname) ? false : true} user={session}>
                        <Component pathname={router.pathname} user={session}/>
                </Layout>
            : loading ? 
                <Loading/>
            :
                <Login/>
            }
        </>
    )
}