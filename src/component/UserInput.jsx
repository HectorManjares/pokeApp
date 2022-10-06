import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/userName.slice';
import Input from "../assets/videos/rieteash.mp4"


const UserInput = () => {

    const dispatch = useDispatch();
    const[ userName, setUserName ] = useState('');

    const navigate = useNavigate()

    const dispatchUserName = () => {
        dispatch(changeName(userName))
        navigate("/pokedex")
    }

    return (
        <div>
            <video src={Input} autoPlay loop muted width="100%"/>
            <input type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Type your Name"
            className='inputUser'/>
            <button onClick={dispatchUserName} className="inputButton">Send</button>
        </div>
    );
};

export default UserInput;