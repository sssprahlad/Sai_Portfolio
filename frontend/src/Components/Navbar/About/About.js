import React from 'react'
import "./About.css"
import { useSelector } from 'react-redux';

const About = () => {
    const {darkAndLightMode} = useSelector((state) => state.services);
    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            <h1>About</h1>
        </div>
    );
}

export default About

