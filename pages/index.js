import React, {useEffect} from 'react';
import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {

  useEffect(() => {
    fetch('/api/hello')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    });
    return () => {
      
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Blog Site</title>
        <meta name="description" content="Not another blogsite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>Hello world</h3>
      </main>
      
    </Layout>
  )
}
