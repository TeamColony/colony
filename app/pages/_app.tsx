import { useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import Layout from '../components/Layout'
import Login from '../components/Login'
import {useState} from 'react';
import { SocketCtx } from '../context/socket'
import {io} from 'socket.io-client';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

import '../styles/global.css';
import { useEffect } from 'react'

export default function App(props: any) {
    const {Component, router} = props;
  
    const standalone = ['/workers/[slug]', '/categories/[slug]', '/messages',
               '/chat/[slug]', '/request/[slug]', '/newjob']
               
    const [session, loading] = useSession();
    const [socketInstance, setSocketInstance]: any = useState(false);
    const [displayOngo, setDisplayOngo] = useState('true');

    useEffect(() => {
        if(!socketInstance && session){
          setSocketInstance(io({auth: {token: session.accessToken}}));
        }
    }, [session]);

    const client = new ApolloClient({
        link: ApolloLink.from([
          new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'same-origin'
          })
        ]),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          }
        }
    });

    var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
        <ApolloProvider client={client}>
            {session && socketInstance?
                <Layout pathname={router.pathname} ongo={displayOngo} 
                    setOngo={setDisplayOngo} useNav={standalone.includes(router.pathname) ? false : true} user={session}>
                    <SocketCtx.Provider value={socketInstance}> 
                        <Component formatter={formatter} router={router} 
                            setOngo={setDisplayOngo} ongo={displayOngo} user={session}/>
                    </SocketCtx.Provider>
                </Layout>
            : loading ? 
                <Loading/>
            :
                <Login/>
            }
        </ApolloProvider>
    )
}