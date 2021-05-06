import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react'
import Layout from '../../components/layout';
import styles from '../../styles/user.module.scss';

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
            setError(true);
            setSuccess(false);
        }
    }
    
    return (
        <Layout>
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
                    {error && <p className="error">Oops... Something went wrong.</p>}
                    {success && <p>New user has been created!</p>}
                </div>
            </form>
            <Link href='/'><a className="link">Back to users</a></Link>
        </Layout>
    )
}

