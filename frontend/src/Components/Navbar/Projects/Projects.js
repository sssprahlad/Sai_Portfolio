import React from 'react'
import "./Projects.css"
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GET_PROJECTS_API,API } from '../../../constants/Constants';
import { FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
    const {darkAndLightMode} = useSelector((state) => state.services);
    const [getProjects, setGetProjects] = useState([]);
    const [filterProjects, setFilterProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('all');




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


          const handleProjectViews = (url) => {
                 const fileUrl = url; 
                    const link = document.createElement("a");
                    link.href = fileUrl;
                    // link.download = url; 
                    // link.target = "_blank"; 
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
            }


    useEffect(() => {
       if(searchQuery === "all"){
        setFilterProjects(getProjects);
       }
       else{
        const filteredProjects = getProjects.filter((item) => item?.projectCategory.toLowerCase() === searchQuery.toLowerCase());
        console.log(filteredProjects);
        setFilterProjects(filteredProjects);
       }
    },[searchQuery,getProjects])        
                  


    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            

            <div className='col-parent-container common-container'>
                <div>
                    <h1 className="experience-title">Projects</h1>
                    <div className='under-line'></div>
                </div>

                <div>
                    <h1 className="filter-title-text">Filter By Technologies</h1>
                    <div className='filter-select-container'>
                        <select className='filter-select' onChange={(e) => setSearchQuery(e.target.value)}>
                            <option  value="all">All</option>
                            <option value="react">React</option>
                            <option value="javascript">JavaScript</option>
                            <option value="mern stack">Mern Stack</option>
                            <option value="java full stack">Java Full Stack</option>
                            <option value="html">Html_css</option>
                       
                        </select>
                        
                    </div>
                </div>


                <div className='education-container'>
                    { filterProjects?.length === 0 ? (<p style={{color:"#e74c3c"}}>No Projects Found</p>) : 
                    (                
                    filterProjects?.map((item) => (
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
                                <div className='live-container' onClick={() => handleProjectViews(item?.projectLink)} >
                                    <h3>Live</h3>
                                     <FaExternalLinkAlt />
                                </div>
                                <div className='git-container' onClick={() => handleProjectViews(item?.gitUrl)}>
                                    <h3>Git</h3>
                                    <FaExternalLinkAlt />
                                </div>
                            </div>
                        </div>
                    </div>
                    )))}
                    
                </div>
            </div>


        </div>
    );
}

export default Projects