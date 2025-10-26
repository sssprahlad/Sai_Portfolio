import React from 'react';
import './Navbar.css';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

import Switch from '@mui/material/Switch';

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { GoProjectSymlink } from "react-icons/go";
import { LuPhoneCall } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";




const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));



const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    console.log(token);


    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };
    const handleAdminClick = () => {
        navigate("/login")  
    }
    const handleNavClick = () => {
       setTimeout(() => {
        setMobileMenuOpen(!mobileMenuOpen);
       }, 400);
    }

      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }




    return (
      <> 
     
        <div className="navbar-container">
            <nav className="navbar">
                <h1 className="navbar-title">Portfolio</h1>
                <ul className="ul-nav-list">
                    <li> <Link className="nav-link" to="/">Home </Link></li>
                    <li><Link className="nav-link" to="/about">About </Link></li>
                    <li><Link className="nav-link" to="/projects">Projects </Link></li>
                    <li><Link className="nav-link" to="/contact">Contact </Link></li>
                    {token && <li><Link className="nav-link" to="/admin">Admin </Link></li>}
                    
                </ul>
                
                <div className="admin-part">
                    <MaterialUISwitch checked={darkMode} onChange={handleThemeChange} />
                  {!token ? <button type="button" onClick={handleAdminClick} className="admin-button">Admin</button> : <button className='logout-button' onClick={handleLogout}>Logout</button>} 
                </div>

            </nav>
        </div>

        <div className='mobile-navbar'>
          <div className='mobile-navbar-header'>
            <h2>Portfolio</h2>
           <div className="admin-part">
                    <MaterialUISwitch checked={darkMode} onChange={handleThemeChange} />
                    {!token ? <button type="button" onClick={handleAdminClick} className="admin-button">Admin</button> : <button className='logout-button' onClick={handleLogout}>Logout</button>}
                </div>
            <div className="mobile-navbar-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <MdOutlineCancel /> : <GiHamburgerMenu />}
            </div>
            
          </div>
          
          {mobileMenuOpen && (
            <div className="mobile-navbar-menu">
              <ul>
                <li onClick={handleNavClick}><Link className="nav-link" to="/"> <IoHomeOutline  className='nav-link-icon'/> Home </Link></li>
                <li onClick={handleNavClick}><Link className="nav-link" to="/about"> <BiErrorCircle className='nav-link-icon'/> About </Link></li>
                <li onClick={handleNavClick}><Link className="nav-link" to="/projects"> <GoProjectSymlink className='nav-link-icon'/> Projects </Link></li>
                <li onClick={handleNavClick}><Link className="nav-link" to="/contact"> <LuPhoneCall className='nav-link-icon'/> Contact </Link></li>
                {token && <li onClick={handleNavClick}><Link className="nav-link" to="/admin"> <GrUserAdmin className='nav-link-icon'/> Admin </Link></li>}
              </ul>
            </div>
          )}

        </div>
        </>

        


    );
}

export default Navbar;
