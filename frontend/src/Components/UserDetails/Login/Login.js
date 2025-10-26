import React from 'react';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_API, FETCH_DATA } from "../../../constants/Constants"
import SnackbarPopup  from "../../../constants/Snackbar";


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
      });

     
     const handleChangeText = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);

  try {
    const response = await FETCH_DATA(LOGIN_API, "POST", userData);
    console.log(response);

    if (response.status === 200) {
        setSnackbar({
            open: true,
            message: response.message,
            severity: 'success'
          });

        setTimeout(() => {
            localStorage.setItem("token", response.token);
            navigate("/admin");  
        }, 1000);
        setMessage(response.message);
   
    } else {
      setMessage(response.message);
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'error'
      });
     
    }
  } catch (error) {
    console.log(error);
    setMessage(error.message);
    setSnackbar({
      open: true,
      message: error.message,
      severity: 'error'
    });
   
  }
};


    console.log(message);

   
    return (
        <div className="login-container">
           
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className='login-title'>Admin Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" value={userData.email} name="email" onChange={handleChangeText} />
                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={userData.password} name="password" onChange={handleChangeText} />
                <div className='show-password-container'>
                <input className='show-password-input' type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showPassword">show password</label>
                </div>
                <button type="submit" className='login-button'>Login</button>
            </form>
           
            <SnackbarPopup open={snackbar.open} message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            </div>
    );
};

export default Login;
