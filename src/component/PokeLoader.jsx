import React from 'react';
import Loader from '../assets/videos/pokebola.mp4'


const PokeLoader = () => {
    return (
        <div className='contLoader'>
            <video src={Loader} autoPlay muted/>
        </div>
    );
};

export default PokeLoader;