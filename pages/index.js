import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import axios from 'axios';
import styles from '../styles/user.module.scss';

export default function Home({users}) {

  return (
    <Layout>
      <Head>
        <title>Blog Site</title>
        <meta name="description" content="Not another blogsite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.usersContainer}>
        <h3>Our Users</h3>
        <div className={styles.tableWrap}>
          <table className={styles.userTable}>
          <thead>
              <tr>
                <th><span>Username</span></th>
                <th><span>Password</span></th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td><Link href={`/user/${user.id}/view`}><a className="link black">{user.username}</a></Link></td>
              <td><span>{user.password}</span></td>
              <td className={styles.flexCell}>
                <Link href={`/user/${user.id}/update`}>
                  <a className="button">Update</a>
                </Link>
              </td>
            </tr>
          )
          )}
          </tbody>
          </table>
        </div>
        <Link href='/user/create'><a className="link backtoindex">Create user</a></Link>
      </div>
      
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