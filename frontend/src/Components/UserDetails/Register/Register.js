import React, { useState } from "react";
import './Register.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

        const handleChangeText = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    


    return (
        <div>
            <h1>Register User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" value={userData.username} name="username" onChange={handleChangeText}/>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" value={userData.email} name="email" onChange={handleChangeText} />
                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={userData.password} name="password" onChange={handleChangeText} />
                <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
