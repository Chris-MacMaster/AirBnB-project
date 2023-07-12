import React from 'react';
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchSpotsSearch } from '../../store/search';


const SearchBar = () => {
    // const dispatch = useDispatch(
    const history = useHistory()
    const dispatch = useDispatch()
    const [parameters, setParameters] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(fetchSpotsSearch())
        history.push(`/search/${parameters}`)
    }

    return (
        <div className=''>
            <div className='search-bar'>
                <form onSubmit={handleSubmit} className='search-bar-form'>
                    <input className='header-search' id='header-search' type='text' value={parameters}
                        onChange={(e) => setParameters(e.target.value)}
                        placeholder='Search for spots'></input>
                </form>
            </div>

        </div>
    );
};

export default SearchBar;



















