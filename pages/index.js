import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import axios from 'axios';
import styles from '../styles/user.module.scss';
import Users from '../components/users/Users';
import UserFilters from '../components/users/UserFilters';

export default function Home({users}) {

  const [sortedUsers, setSortedUsers] = useState(users);

  const [filters, setFilters] = useState({
    sort: "",
    name: ""
  });

  useEffect(() => {
    sortUsers();
  }, [filters]);

  function sortUsers(){
    setSortedUsers([...users
      .filter(user => {
        if(filters.name){
          return user.username.toLowerCase().startsWith(filters.name.toLowerCase());
        } else {
          return user;
        }
      })
      .sort((a, b) => {
        if(filters.sort === "A-Z"){
          return a.username > b.username ? 1 : a.username < b.username ? -1 : 0
        }
        if(filters.sort === "Z-A"){
          return a.username > b.username ? -1 : a.username < b.username ? 1 : 0
        }
        if(filters.sort === ""){
          return a.id - b.id;
        }
      }
    )
    ]);
  }

  return (
    <Layout>
      <Head>
        <title>Blog Site</title>
        <meta name="description" content="Not another blogsite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.usersContainer}>
        <h3>Our Users</h3>
        
        <UserFilters filters={filters} setFilters={setFilters} />
        <Users sortedUsers={sortedUsers} />

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