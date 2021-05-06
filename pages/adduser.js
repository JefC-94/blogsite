import axios from 'axios';
import React, {useState} from 'react'

function AddUser() {
    
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
        <div>
            <form onSubmit={onSubmitHandler} >
                <input type="text" value={formData.nameField} name="nameField" onChange={onChangeHandler} />
                <input type="password" name="passField" value={formData.passField} onChange={onChangeHandler} />
                <button type="submit">Add user</button>
                {JSON.stringify(formData)}
            </form>
        </div>
    )
}

export default AddUser
