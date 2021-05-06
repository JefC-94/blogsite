import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react'
import Layout from '../../components/layout';

export default function CreateUser() {
    
    const [formData, setFormData] = useState({
        nameField: "",
        passField: ""
    });

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const request = await axios.post('/api/adduser', {
            username: formData.nameField,
            password: formData.passField
        });
        console.log(request.data);
    }
    
    return (
        <Layout>
            <div>
            <form onSubmit={onSubmitHandler} >
                <input type="text" value={formData.nameField} name="nameField" onChange={onChangeHandler} />
                <input type="text" name="passField" value={formData.passField} onChange={onChangeHandler} />
                <button type="submit">Add user</button>
            </form>
            </div>
            <Link href='/'>Back to users</Link>
        </Layout>
    )
}

