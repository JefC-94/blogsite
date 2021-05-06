import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react'
import Layout from '../../../components/layout';

export default function UpdateUser({user}) {
    
    const [formData, setFormData] = useState({
        nameField: user.username,
        passField: user.password
    });

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const request = await axios.put(`/api/user/${user.id}`, {
            username: formData.nameField,
            password: formData.passField
        });
        console.log(request.data);
    }
    
    return (
        <Layout>
            <form onSubmit={onSubmitHandler} >
                <input type="text" value={formData.nameField} name="nameField" onChange={onChangeHandler} />
                <input type="text" name="passField" value={formData.passField} onChange={onChangeHandler} />
                <button type="submit">Update user</button>
                {JSON.stringify(formData)}
            </form>
            <Link href='/'>Back to users</Link>
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