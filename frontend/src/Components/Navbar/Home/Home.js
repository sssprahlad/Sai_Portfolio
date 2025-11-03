import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GET_MY_DETAILS_API } from "../../../constants/Constants";
import { useDispatch } from "react-redux";
import { setMyDetails } from "../../../redux/reducer/services";

const Home = () => {
  const [getMyDetails, setGetMyDetails] = useState([]);
  const dispatch = useDispatch();
  const { darkAndLightMode, myDetails } = useSelector(
    (state) => state.services
  );
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyDetails();
  }, []);

  const fetchMyDetails = async () => {
    try {
      const response = await fetch(GET_MY_DETAILS_API);
      if (response.status === 200) {
        const data = await response.json();
        setGetMyDetails(data?.rows?.[0]);
        dispatch(setMyDetails(data?.rows?.[0]));
      }
    } catch (error) {
      console.log(error);
      setGetMyDetails([]);
    }
  };

  return (
    <div
      className={`all-pages-container ${
        darkAndLightMode
          ? "dark-bg-parent-container"
          : "light-bg-parent-container"
      }`}
    >
      {/* <h1 className='home'>Home</h1> */}
      <div className="row-parent-container">
        <div className="child-container1">
          <h1 className="home-title">I'm Sai Prahlad</h1>
          <p className="home-sub-title">Full Stack Developer</p>
          <p>
            I specialize in building full-stack web applications using SqLite,
            Express, React, and Node.js. I love creating clean, scalable, and
            efficient solutions for real-world problems.
          </p>

          <div className="social-media-container">
            <ul>
              <li>
                <a
                  className={`social-media-icon ${
                    darkAndLightMode ? "dark-text" : "light-text"
                  }`}
                  href={myDetails?.instagram}
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  className={`social-media-icon ${
                    darkAndLightMode ? "dark-text" : "light-text"
                  }`}
                  href={myDetails?.github}
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  className={`social-media-icon ${
                    darkAndLightMode ? "dark-text" : "light-text"
                  }`}
                  href={myDetails?.linkedIn}
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className={`social-media-icon ${
                    darkAndLightMode ? "dark-text" : "light-text"
                  }`}
                  href={myDetails?.twitter}
                >
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="more-about-btn"
            onClick={() => navigate("/about")}
          >
            More About Me
          </button>
        </div>
        <div className="child-container2 common-container">
          <img
            className="profile-image"
            src={getMyDetails?.profileImage}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
