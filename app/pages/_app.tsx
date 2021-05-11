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
    const standalone = ['/workers/[slug]']
    const [session, loading] = useSession(); //todo: change to static export funciton to prevent re-rendering and other jazz!
    const [socketInstance, setSocketInstance]: any = useState(false);

    useEffect(() => {
        if(!socketInstance && session){
          setSocketInstance(io({auth: {token: session.accessToken}},{transports: ['websocket']}));
        }
    }, [session])

    const client = new ApolloClient({
        link: ApolloLink.from([
          new HttpLink({
            uri: 'https://www.colonyapp.co.uk/graphql',
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

    return (
        <ApolloProvider client={client}>
            {session && socketInstance?
                <Layout useNav={standalone.includes(router.pathname) ? false : true} user={session}>
                    <SocketCtx.Provider value={socketInstance}> 
                        <Component router={router} pathname={router.pathname} user={session}/>
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