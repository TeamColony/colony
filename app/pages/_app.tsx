import { signIn, useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import NavBar from '../components/navbar'
import Layout from '../components/Layout'

export default function App(props: any) {
    const {Component} = props;
    const [session, loading] = useSession();

    return (
        <div>
            {session?
                <Layout user={session}>
                        <Component user={session}/>
                </Layout>
            : loading ? 
                <Loading/>
            :
                <div>
                    <button onClick={() => signIn('google')}>login</button>
                </div>
            }
        </div>
    )
}
