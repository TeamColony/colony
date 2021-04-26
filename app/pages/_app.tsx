import { signIn, useSession } from 'next-auth/client'
import Loading from '../components/Loading'

export default function App(props: any) {
    const {Component} = props;
    const [session, loading] = useSession();

    return (
        <div>
            {session?
                <Component/>
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