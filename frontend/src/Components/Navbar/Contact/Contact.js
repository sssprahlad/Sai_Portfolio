import React from 'react'
import { useState } from 'react';
import "./Contact.css"
import { useSelector } from 'react-redux';
import { FaMobileAlt } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import {SEND_MAIL_API} from "../../../constants/Constants";
import SnackbarPopup from "../../../constants/Snackbar";



const Contact = () => {

    const {darkAndLightMode,myDetails} = useSelector((state) => state.services);
    const [mailDetails, setMailDetails] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
      });



    const contactDetails = [
    {
        id:1,
        icon: <FaMobileAlt />,
        title: "Phone",
        description: myDetails.phone
    },
    {
        id:2,
        icon: <TbMailShare />,
        title: "Email",
        description: myDetails.email
    },
    {
        id:3,
        icon: <FaHouseUser />,
        title: "Address",
        description: myDetails.address
    },
    {
        id:4,
        icon:  <FaGlobeAmericas />, 
        title: "Website",
        description: "https://www.example.com"
    }
]


    const handleContactChange = (e) => {
        const {name, value} = e.target;
        setMailDetails({...mailDetails, [name]: value});
    }

    const handleSubmitContactDetails = () => {
        console.log(mailDetails);

        const fetchData = async () => {
            const response = await fetch(SEND_MAIL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mailDetails),
            });
            const data = await response.json();
            console.log(data);
            if(data.status === 200){
                setSnackbar({
                    open: true,
                    message: data.message,
                    severity: 'success'
                  });
            }
            else{
                setSnackbar({
                    open: true,
                    message: data.message,
                    severity: 'error'
                  });
            }
        }

        if(mailDetails.name && mailDetails.email && mailDetails.message){
            fetchData();
        }else{
            setSnackbar({
                open: true,
                message: "Please fill all the fields.",
                severity: 'error'
              });
        }

    }



    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            
             <div className='col-parent-container common-container pl-2'>
                <div>
                    <h1 className="experience-title">Get in touch</h1>
                    <div className='under-line'></div>
                    </div>

            <div className='row-parent-container'>
                <div className='contact-container1'>
                    <h2 className='contact-us-text'>Contact Us</h2>
                    <div className='contact-us-container contact-height'>
                        {contactDetails?.map((contact,index) => (
                          
                                <div className='contact-alignment' key={index}>
                                    <div>
                                   {/* <span className='conatct-us-icons'> {contact.icon}</span> */}
                                   {contact.icon}
                                    </div>
                                    <div className='contact-description'>
                                    <p >{contact.description}</p>
                                    </div>
                                </div>
                           
                        ))}
                    </div>
                    
                   
                </div>


                 <div className='contact-container1 '>
                    <h2 className='send-me-text'>Send me a Message</h2>
                    <div className='contact-us-container'>
                       
                          
                                <div className='contact-alignment'>
                                    <input classNam="contact-input" type="text" placeholder='Name' name="name" onChange={handleContactChange} required />
                                </div>

                                 <div className='contact-alignment'>
                                    
                                    <input classNam="contact-input" type="text" placeholder='Email' name="email" onChange={handleContactChange} required />              
                                </div>
                                <div className='contact-alignment'>
                                    <textarea  placeholder='Message' cols="11" rows="4" name="message" onChange={handleContactChange} required/>              
                                </div>
                                <button type="button" className='send-message-btn' onClick={handleSubmitContactDetails}>Send Message</button>
 
                    </div>
                    <SnackbarPopup open={snackbar.open} message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar}/>
                   
                </div>
             

          


                </div>
            </div>

            <div className='common-container col-parent-container'>

                <div>
                    <h1 className="experience-title">Location</h1>
                    <div className='under-line'></div>
                    </div>


                <iframe src={myDetails.location} width={"100%"} height={"400px"} style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            </div>


        </div>
    );
}

export default Contact
