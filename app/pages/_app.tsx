import { useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import Layout from '../components/Layout'
import Login from '../components/Login'

import '../styles/global.css';

export default function App(props: any) {
    const {Component} = props;
    const [session, loading] = useSession();

    return (
        <>
            {session?
                <Layout user={session}>
                        <Component user={session}/>
                </Layout>
            : loading ? 
                <Loading/>
            :
                <Login/>
            }
        </>
    )
}
