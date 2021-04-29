import React from 'react'
import Head from 'next/head'
import NavBar from './Navbar'

const Layout = (props: any) => {
  return (
  <>
    <Head>
      <title>{"Colony"}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    </Head>
    <header>
      {props.useNav && 
        <NavBar user={props.user}/>
      }
    </header>
      {props.children}
  </>
)}

export default Layout
