import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import Layout from '../../components/layout'

export default function User({user}) {
    return (
        <Layout>
            <p>{user.username}</p>
            <Link href="/"><a>Back to users</a></Link>
        </Layout>
    )
}

export async function getServerSideProps(context){
    console.log("executed on server");

    const id = context.params.id;
    console.log(id);

    const request = await axios.get(`http://localhost:3000/api/user/${id}`);
    console.log(request.data);
    const user = request.data;

    return {
        props: {user}
    }

}
