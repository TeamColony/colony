import { signIn, useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import NavBar from '../components/navbar'

export default function App(props: any) {
    const {Component} = props;
    const [session, loading] = useSession();

    return (
        <div>
            {session?
                
                <NavBar globalProps={props} {...props}/>
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