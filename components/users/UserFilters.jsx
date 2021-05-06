import React, {useState, useEffect} from 'react'
import styles from '../../styles/user.module.scss';

function UserFilters({filters, setFilters}) {
    
    const [inputField, setInputField] = useState('');

    //When user types in inputfield, we need to filter on name (but wait 400ms)
    useEffect(() => {
        if(inputField){
            setTimeout(() => {
                setFilters(prevVal => ({...prevVal, name: inputField}));
            }, 400);
            
        } else {
            setTimeout(() => {
                setFilters(prevVal => ({...prevVal, name: null}));
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputField]);
    
    return (
        <div className={styles.filtersWrap}>
            <select value={filters.sort} onChange={(e) => setFilters(prevVal => ({...prevVal, sort: e.target.value}))}>
                <option value="" >Sort</option>
                <option value="A-Z">Name A-Z</option>
                <option value="Z-A">Name Z-A</option>
            </select>
            <input type="text" placeholder="Search by name..." value={inputField} onChange={(e) => setInputField(e.target.value)} />
        </div>
    )
}

export default UserFilters
