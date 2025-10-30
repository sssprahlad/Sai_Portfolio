import React from 'react'
import "./About.css"
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {API,GET_MY_EXPERIENCE_API} from "../../../constants/Constants"
import { FaAngleDoubleRight } from "react-icons/fa";


const educationDetails = [
    {
        "id":1,
        "collageImage":"https://kitspharma.com/img/about1.jpg",
        "collegeName":"Kakinada Institute of Technology and Science",
        "passingYear":"2018-2021",
        "course":"B.Tech, Electrical and Electronics Engineering",
        "percentage":"69%",
        "collegeAddress":"Ramachandrapuram, Andra Pradesh, India"     
    },
    {
        "id":2,
        "collageImage":"https://kitspharma.com/img/about1.jpg",
        "collegeName":"Kakinada Institute of Technology and Science",
        "passingYear":"2015-2018",
        "course":"Diploma, Electrical and Electronics Engineering",
        "percentage":"74%",
        "collegeAddress":"Ramachandrapuram, Andra Pradesh, India"     
    },
    {
        "id":3,
        "collageImage":"https://kitspharma.com/img/about1.jpg",
        "collegeName":"Zphs Boy's High School",
        "passingYear":"2008-2015",
        "course":"SSC, High School",
        "percentage":"88%",
        "collegeAddress":"G.Mamidada, Andra Pradesh, India"     
    }
]


const About = () => {
    const {darkAndLightMode,myDetails} = useSelector((state) => state.services);
    const [experience,setExperience] = useState([]);


    useEffect(() => {
        fetchExperience();
    },[])

     const fetchExperience = async () => {
            const response = await fetch(GET_MY_EXPERIENCE_API);
            if(response.status === 200){
                const data = await response.json();
                setExperience(data?.data);
            }
        }


        const handleDownlodCv = (myDetails) => {
             const fileUrl = `${API}/${myDetails?.resumePath}`; 
                const link = document.createElement("a");
                link.href = fileUrl;
                link.download = myDetails?.resumeName; 
                // link.target = "_blank"; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        }

    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            
            <div className='row-parent-container'>
                <div className='child-container1'>
                    <h1 className={`about-name`}>My name is <br/> <span >{myDetails?.name}</span></h1>
                    <p className='about-description'>{myDetails?.description}</p>
                    <button type='button' className='cv-btn' onClick={() => handleDownlodCv(myDetails)}>Downlod Cv</button>

                </div>
                <div className='child-container2 common-container'>
                    <img className='profile-image' src={myDetails?.profileImage} alt="Profile Image" />
                </div>

            </div>

            <div className='col-parent-container common-container'>
                <div>
                    <h1 className="experience-title">Experience</h1>
                    <div className='under-line'></div>
                </div>
                
               <div className='experience-card'>
                 {experience?.map((exp,index) => (
                    <div key={index} className='company-details-container'>
                        <h1 >{index + 1}. {exp.company}</h1>
                        <div className='position-container'>
                            <h2>Position :- </h2>
                            <div>
                            <h3 >{exp.position}</h3>
                            </div>
                        </div>

                        <div className='position-container'>
                            <h2>Duration :- </h2>
                            <div>
                            <h3 >{exp.duration}</h3>
                            </div>
                        </div>
                        
                        <ul className='experience-responsibility-list'>
                            <h2 className='responsibilities-title'>Responsibilities :- </h2>
                            {exp.responsibilities?.map((responsibility,index) => (
                                <li key={index}> <FaAngleDoubleRight className='arrows-icon' /> {responsibility}</li>
                            ))}
                        </ul>
                         <div className='under-line'></div>
                    </div>
                ))}
               </div>

            </div>


            <div className='col-parent-container common-container'>
                 <div>
                    <h1 className="experience-title">Technical Skills</h1>
                    <div className='under-line'></div>
                </div>

                <div className='skils-container'>  
                    <div className='frontend-container'>
                        
                        <h2>Frontend</h2> 
                        
                        <ul className='technical-skills-container'>
                                {myDetails?.frontend?.map((skill,index) => (
                                <li key={index} >{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='frontend-container'>
                        <h2>Backend</h2> 
                        <ul className='technical-skills-container'>
                                {myDetails?.backend?.map((skill,index) => (
                                <li key={index} >{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='frontend-container'>
                        <h2>Database</h2> 
                        
                        <ul className='technical-skills-container'>
                                {myDetails?.database?.map((skill,index) => (
                                <li key={index} >{skill}</li>
                            ))}
                        </ul>
                    </div>
             </div>
        </div>


                <div className='col-parent-container common-container'>
                 <div>
                    <h1 className="experience-title">Education</h1>
                    <div className='under-line'></div>
                </div>
                <div className='education-container'>
                    {educationDetails?.map((education,index) => (
                        <div class="education-card">
                        <div class="big-img-container">
                            <img
                            src="https://kitspharma.com/img/about1.jpg"
                            alt="bg-img"
                            />
                            <div class="inner-hide-content">
                            <h1>{education.percentage}</h1>
                            </div>
                        </div>

                        <div class="education-info">
                            <div class="small-img-container">
                            <img
                                src={myDetails?.profileImage}
                                alt="profile"
                            />
                            </div>
                            <div class="college">
                                <h3>{education.collegeName}</h3>
                            </div>
                            <div className='education-year-details'>
                                <p class="dates">{education.passingYear}</p>
                                <p class="percentage-chip">Percentage: {education.percentage}</p>
                                <h4 class="specilization">{education.course}</h4>
                                <p class="address">{education.collegeAddress}</p>
                            </div>
                        </div>
                </div>
                    ))}
                </div>
            </div>

               
    </div>



               

           

            

        
    );
}

export default About

