import React from 'react'
import "./Projects.css"
import { useSelector } from 'react-redux';

const Projects = () => {
    const {darkAndLightMode} = useSelector((state) => state.services);
    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            <h1>Projects</h1>
        </div>
    );
}

export default Projects