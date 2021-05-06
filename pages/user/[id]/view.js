import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/layout';
import router from 'next/router';
import styles from '../../../styles/user.module.scss';

export default function User({user}) {
    
    async function deleteUser(){
        const request = await axios.delete(`/api/user/${user.id}`);
        console.log(request.data);
        if (request.status === 200) {
            console.log("user deleted");
            router.push('/');
        } else {
            console.log("something went wrong");
        }
    }
    
    return (
        <Layout>
            <div className={styles.userDetail}>
            <p>{user.username} {user.password}</p>

            <button onClick={() => deleteUser()}>Delete</button>
            </div>
            <Link href="/"><a>Back to users</a></Link>
        </Layout>
    )
}

export async function getServerSideProps(context){
    console.log("executed on server");
    const id = context.params.id;
    const request = await axios.get(`http://localhost:3000/api/user/${id}`);
    const user = request.data;

    return {
        props: {user}
    }

}
