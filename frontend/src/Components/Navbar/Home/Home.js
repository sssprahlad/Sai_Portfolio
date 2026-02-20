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
import Tooltip from "@mui/material/Tooltip";
import { setMyDetails } from "../../../redux/reducer/services";

const Home = () => {
  const [getMyDetails, setGetMyDetails] = useState([]);
  const dispatch = useDispatch();
  const { darkAndLightMode, myDetails } = useSelector(
    (state) => state.services,
  );

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyDetails();
  }, []);

  const fetchMyDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(GET_MY_DETAILS_API, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Unauthorized or failed:", response.status);
        return;
      }
      const data = await response.json();
      if (data.status === 200) {
        console.log(data, "home data");
        // data.success
        // setGetMyDetails(data.myDetails);
        // dispatch(setMyDetails(data.myDetails));
        setGetMyDetails(data?.rows[0]);
        dispatch(setMyDetails(data?.rows[0]));
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const HorizontalScroll = () => {
    const items = [
      {
        id: 1,
        image: "/images/My portfolio.png",
        text: "Portfolio Website",
        liveUrl: "https://sai-portfolio-tawny.vercel.app",
      },
      {
        id: 2,
        image: "/images/Todos_js.png",
        text: "Todo Application",
        liveUrl: "https://kprahladtodos.ccbp.tech",
      },
      {
        id: 3,
        image: "/images/klicks_ecommerce.png",
        text: "E-Commerce Platform",
        liveUrl: "https://klickks-assignment-ten.vercel.app",
      },
      {
        id: 4,
        image: "/images/evallo_team_management.png",
        text: "Team Management",
        liveUrl: "https://evallo-hrms-task.vercel.app",
      },
      {
        id: 5,
        image: "/images/medication.png",
        text: "Medication Tracker",
        liveUrl: "https://medication-three.vercel.app",
      },
      {
        id: 6,
        image: "/images/nxt_watch.png",
        text: "Video Streaming",
        liveUrl: "https://nxtwatch.ccbp.tech/login",
      },
      {
        id: 7,
        image: "/images/Jobs_findout.png",
        text: "Job Finder",
        liveUrl: "https://prahladjobby.ccbp.tech/login",
      },
      {
        id: 8,
        image: "/images/ablespace.png",
        text: "Able Space",
        liveUrl: "https://ablespace-sepia.vercel.app",
      },
      {
        id: 9,
        image: "/images/app-store.png",
        text: "App Store",
        liveUrl: "https://prahladapp.ccbp.tech",
      },
      {
        id: 10,
        image: "/images/app_script.png",
        text: "App Script",
        liveUrl: "https://appscript-task-eight.vercel.app",
      },
      // {
      //   id: 11,
      //   image: "/images/app_script_1.png",
      //   text: "App Script Pro",
      // },
      // {
      //   id: 12,
      //   image: "/images/app_script_image.png",
      //   text: "Script Manager",
      // },
      {
        id: 13,
        image: "/images/capserv.png",
        text: "CapServ",
        liveUrl: "https://capserv-fe-task.vercel.app",
      },
      {
        id: 14,
        image: "/images/team_management_evallo.png",
        text: "Evallo Team",
        liveUrl: "https://evallo-hrms-task.vercel.app",
      },
      {
        id: 15,
        image: "/images/th_work.png",
        text: "Work Tracker",
        liveUrl: "https://th-works-task-manager.vercel.app",
      },

      {
        id: 17,
        image: "/images/the chef cart.png",
        text: "Chef Cart",
        liveUrl: "https://the-chef-kart-fe-task-ciyn.vercel.app",
      },
      {
        id: 18,
        image: "/images/user_management_syatem.png",
        text: "User Management",
        liveUrl: "https://ajackus-8imy.vercel.app",
      },
      {
        id: 19,
        image: "/images/wikipedia_img.png",
        text: "Wiki Clone",
        liveUrl: "https://mygoogle.ccbp.tech",
      },
      {
        id: 20,
        image: "/images/red bus.png",
        text: "Red Bus",
        liveUrl: "https://our-bus.vercel.app",
      },
      //  {
      //   id: 16,
      //   image: "/images/th_work_2.png",
      //   text: "Work Manager",

      // },
      {
        id: 21,
        image: "/images/pasivot.png",
        text: "Pasivot",
        liveUrl: "https://pasovit-ecommerce-ten.vercel.app",
      },
    ];

    return (
      <div className="horizontal-scroll-section">
        <div className="scroll-header">
          <h2>My Projects</h2>
          {/* <p>Explore my recent work and creations</p> */}
        </div>
        <div className="scroll-container">
          <div className="scroll-content">
            {[...items, ...items].map((item, index) => (
              <div className="scroll-item" key={`${item.id}-${index}`}>
                <div className="project-card">
                  <img src={item.image} alt={item.text} />
                  <div className="project-info">
                    <h3>{item.text}</h3>
                    <button
                      className="view-project-btn"
                      onClick={() => window.open(item.liveUrl, "_blank")}
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
          <Tooltip title="More About Me">
            <button
              type="button"
              className="more-about-btn"
              onClick={() => navigate("/about")}
            >
              More About Me
            </button>
          </Tooltip>
        </div>
        <div className="child-container2 common-container">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <img
              className="profile-image"
              src={myDetails?.profileImage}
              alt="Profile"
            />
          )}
        </div>
      </div>
      {HorizontalScroll()}
    </div>
  );
};

export default Home;
