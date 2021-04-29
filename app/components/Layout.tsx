import React, { ReactNode } from 'react'
import Head from 'next/head'

const Layout = (props: any) => {
  return (
  <div>
    <Head>
      <title>{"test"}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    	<div>navbar</div>
    </header>
      {props.children}
  </div>
)}

export default Layout
