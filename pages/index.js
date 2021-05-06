import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import axios from 'axios';

export default function Home({users}) {

  return (
    <Layout>
      <Head>
        <title>Blog Site</title>
        <meta name="description" content="Not another blogsite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>Hello world</h3>
        <div>
          <ul>
          {users && users.map(user => (
            <li key={user.id}>
              <span>{user.username}</span>&nbsp;
              <Link href={`/user/${user.id}/view`}>
                <a>View</a>
              </Link>&nbsp;
              <Link href={`/user/${user.id}/update`}>
                <a>Update</a>
              </Link>
            </li>
          )
          )}
          </ul>
        </div>
        <Link href='/user/create'><a>Create user</a></Link>
      </main>
      
    </Layout>
  )
}

export async function getServerSideProps(){
  console.log("executed on server");

  //for now I need the full url, it fails when I put in just /api/users
  const request = await axios.get('http://localhost:3000/api/users');
  const users = request.data;

  return {
    props: {
      users
    }
  }

}