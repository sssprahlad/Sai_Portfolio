import React from 'react'
import "./Projects.css"
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GET_PROJECTS_API } from '../../../constants/Constants';

const Projects = () => {
    const {darkAndLightMode} = useSelector((state) => state.services);
    const [getProjects, setGetProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    },[])

    const fetchProjects = async () => {
        const response = await fetch(GET_PROJECTS_API);
        if(response.status === 200){
            const data = await response.json();
            setGetProjects(data?.rows);
        }
    }
    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            <h1>Projects</h1>

            <div className='row-parent-container'>
                <div className='project-details-container'>
                    {getProjects?.map((item) => (
                        <div className='project-details-child-container'key={item?.id}>
                           <div className='project-image-container'>
                            <img src={item?.image} alt="project-image" />
                           </div>
                           <div className='project-information-container'>
                            <h1>{item?.title}</h1>
                            <div>
                                {item?.technologies?.map((technology) => (
                                    <span key={technology}>{technology}</span>
                                ))}
                            </div>
                            <div className='live-git-container'>
                                <div className='live-container'>
                                    <a href={item?.projectLink} target="_blank" rel="noopener noreferrer">Live</a>
                                </div>
                                <div className='git-container'>
                                    <a href={item?.gitUrl} target="_blank" rel="noopener noreferrer">Git</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>


        </div>
    );
}

export default Projects