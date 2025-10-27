import React from 'react'
import "./Contact.css"
import { useSelector } from 'react-redux';

const Contact = () => {

    const {darkAndLightMode} = useSelector((state) => state.services);
    return (
        <div className={`all-pages-container ${darkAndLightMode ? "dark-bg-parent-container" : "light-bg-parent-container"}`}> 
            <h1>Contact</h1>
        </div>
    );
}

export default Contact
