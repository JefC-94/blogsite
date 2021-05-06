import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';
import React, {useState} from 'react'
import Layout from '../../../components/layout';
import styles from '../../../styles/user.module.scss';

export default function UpdateUser({user}) {
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
        console.log(request);
        if(request.status === 200){
            console.log('user updated');
            setSuccess(true);
            setError(false);
        } else {
            console.log('something went wrong');
            setError(true);
            setSuccess(false);
        }
    }
    
    return (
        <Layout>
            <form className={styles.userForm} onSubmit={onSubmitHandler} >
                <div className={styles.formControl}>
                    <label htmlFor="nameField">Username</label>
                    <input className={styles.namefield} type="text" value={formData.nameField} name="nameField" onChange={onChangeHandler} />
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="passField">Password</label>
                    <input className={styles.passfield} type="text" name="passField" value={formData.passField} onChange={onChangeHandler} />
                </div>
                <div className={styles.formControl}>
                    <button type="submit">Update user</button>
                </div>
                <div className={styles.formControl}>
                    {error && <p className="error">Oops... Something went wrong.</p>}
                    {success && <p>This user has been updated!</p>}
                </div>
            </form>
            <Link href='/'>Back to users</Link>
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