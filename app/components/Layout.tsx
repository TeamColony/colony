import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar/Navbar';

const Layout = (props: any) => {
  console.log(props)
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
        <NavBar activePage={props.children.type.name} user={props.user}/>
      }
    </header>
      {props.children}
  </>
)}

export default Layout
