import { useSession } from 'next-auth/client'
import Loading from '../components/Loading'
import Layout from '../components/Layout'
import Login from '../components/Login'

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

import '../styles/global.css';

export default function App(props: any) {
    const {Component, router} = props;

    const standalone = ['/workers/[slug]']
    const [session, loading] = useSession();

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

    return (
        <ApolloProvider client={client}>
            {session?
                <Layout useNav={standalone.includes(router.pathname) ? false : true} user={session}>
                        <Component pathname={router.pathname} user={session}/>
                </Layout>
            : loading ? 
                <Loading/>
            :
                <Login/>
            }
        </ApolloProvider>
    )
}