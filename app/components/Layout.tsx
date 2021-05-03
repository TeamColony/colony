import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar/Navbar';

const Layout = (props: any) => {
  return (
  <div className="overallParent">
    <Head>

      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name='description' content='Description' />
      <meta name='keywords' content='Keywords' />

      <link rel='manifest' href='/manifest.json' />
      <link href='icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/apple-icon.png'></link>
      <meta name='theme-color' content='#317EFB' />

      <title>{"Colony"}</title>
      <meta charSet="utf-8" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
     
    </Head>
    <header>
      {props.useNav && 
        <NavBar activePage={props.children.props.pathname} user={props.user}/>
      }
    </header>
      {props.children}
  </div>
)}




export default Layout
