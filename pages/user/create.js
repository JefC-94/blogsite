import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react'
import Layout from '../../components/layout';
import styles from '../../styles/user.module.scss';
import Head from 'next/head';

export default function CreateUser() {
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
        if(formData.nameField && formData.passField){
            const request = await axios.post('/api/adduser', {
                username: formData.nameField,
                password: formData.passField
            });
            if(request.status === 200){
                console.log(request.data.id);
                setSuccess(true);
                setError(false);
            } else {
                console.log('something went wrong');
                setError({message: "something went wrong"});
                setSuccess(false);
            }
        } else {
            setError({message: "Fill in username and password please."});
            setSuccess(false);
        }
    }
    
    return (
        <Layout>
            <Head>
                <title>Create user</title>
                <meta name="description" content="Create a new user on this page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h3>Create user</h3>
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
                    <button type="submit" className="button">Add user</button>
                </div>
                <div className={styles.formControl}>
                    {error && <p className="error">{error.message}</p>}
                    {success && <p className="success">New user has been created!</p>}
                </div>
            </form>
            <Link href='/'><a className="link">Back to users</a></Link>
        </Layout>
    )
}

