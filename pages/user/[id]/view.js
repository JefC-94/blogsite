import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/layout';
import router from 'next/router';

export default function User({user}) {
    
    async function deleteUser(){
        const request = await axios.delete(`/api/user/${user.id}`);
        console.log(request.data);
        if (request.status === 200) {
            router.push('/');
        }
    }
    
    return (
        <Layout>
            <p>{user.username}</p>
            <button onClick={() => deleteUser()}>Delete</button>
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
