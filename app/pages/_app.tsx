import { getSession } from 'next-auth/client'
import Layout from '../components/Layout'

import {SocketCtx} from '../context/socket'
import {io} from 'socket.io-client'

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

import '../styles/global.css';
import App from 'next/app'

export default class Colony extends App {

  constructor (props: any) {
    super(props)
    this.state = {
      socketInstance: props.props.session ? io() : null
    }
  }

  static async getInitialProps({ctx} : {ctx: any}) {
    var s = await getSession(ctx)

    if (typeof window === "undefined" && ctx.res.writeHead) {
      if (!s && ctx.pathname !== '/login') {
          ctx.res.writeHead(302, {location: '/login'})
          ctx.res.end()
      }
    }
    return {
      props : {
        session : s,
      },
      pageProps: {}
    }
  }

  render () {
    const standalone = ['/workers/[slug]', '/login']
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
    const { Component, router, props } : any = this.props
    const {socketInstance} : any = this.state
    if (props.session) {
      socketInstance.auth = {token: props.session.accessToken}
       return (
        <ApolloProvider client={client}>
            <Layout useNav={standalone.includes(router.pathname) ? false : true} user={props.session}>
                <SocketCtx.Provider value={socketInstance}> 
                    <Component router={router} pathname={router.pathname} user={props.session}/>
                </SocketCtx.Provider>
            </Layout>
        </ApolloProvider>
      )
    } else {
      return (
        <Component/>
      )
    }
  }
}