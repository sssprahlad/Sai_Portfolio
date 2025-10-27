import React, { useState } from 'react'
import "./Home.css"
import {useSelector } from 'react-redux';

const Home = () => {
    
    const {darkAndLightMode} = useSelector((state) => state.services);

    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            <h1 className='home'>Home</h1>
        </div>
    );
}

export default Home