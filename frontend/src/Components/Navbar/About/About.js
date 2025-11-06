import React from "react";
import "./About.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API, GET_MY_EXPERIENCE_API } from "../../../constants/Constants";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const educationDetails = [
  {
    id: 1,
    collageImage: "https://kitspharma.com/img/about1.jpg",
    collegeName: "Kakinada Institute of Technology and Science",
    passingYear: "2018-2021",
    course: "B.Tech, Electrical and Electronics Engineering",
    percentage: "69%",
    collegeAddress: "Ramachandrapuram, Andra Pradesh, India",
  },
  {
    id: 2,
    collageImage: "https://kitspharma.com/img/about1.jpg",
    collegeName: "Kakinada Institute of Technology and Science",
    passingYear: "2015-2018",
    course: "Diploma, Electrical and Electronics Engineering",
    percentage: "74%",
    collegeAddress: "Ramachandrapuram, Andra Pradesh, India",
  },
  {
    id: 3,
    collageImage: "https://kitspharma.com/img/about1.jpg",
    collegeName: "Zphs Boy's High School",
    passingYear: "2008-2015",
    course: "SSC, High School",
    percentage: "88%",
    collegeAddress: "G.Mamidada, Andra Pradesh, India",
  },
];

const About = () => {
  const { darkAndLightMode, myDetails } = useSelector(
    (state) => state.services
  );
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await fetch(GET_MY_EXPERIENCE_API);
      if (response.status === 200) {
        const data = await response.json();
        setExperience(data?.data);
      }
    } catch (error) {
      console.log(error);
      setExperience([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownlodCv = (myDetails) => {
    const fileUrl = `${API}/uploads/${myDetails?.resumePath}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = myDetails?.resumeName;
    // link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`all-pages-container ${
        darkAndLightMode
          ? "dark-bg-parent-container"
          : "light-bg-parent-container"
      }`}
    >
      <div className="row-parent-container">
        <div className="child-container1">
          <h1 className={`about-name`}>
            My name is <br /> <span>{myDetails?.name}</span>
          </h1>
          <p className="about-description">{myDetails?.description}</p>
          <Tooltip title="Download Cv">
            <button
              type="button"
              className="cv-btn"
              onClick={() => handleDownlodCv(myDetails)}
            >
              Downlod Cv
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
              alt="Profile Image"
            />
          )}
        </div>
      </div>

      <div className="col-parent-container common-container">
        <div>
          <h1 className="experience-title">Experience</h1>
          <div className="under-line"></div>
        </div>

        <div className="experience-card">
          {loading ? (
            <div className="spinner"> </div>
          ) : (
            experience?.map((exp, index) => (
              <div key={index} className="company-details-container">
                <h1>
                  {index + 1}. {exp.company}
                </h1>
                <div className="position-container">
                  <h2>Position :- </h2>
                  <div>
                    <h3>{exp.position}</h3>
                  </div>
                </div>

                <div className="position-container">
                  <h2>Duration :- </h2>
                  <div>
                    <h3>{exp.duration}</h3>
                  </div>
                </div>

                <ul className="experience-responsibility-list">
                  <h2 className="responsibilities-title">
                    Responsibilities :-{" "}
                  </h2>
                  {exp.responsibilities?.map((responsibility, index) => (
                    <li key={index}>
                      {" "}
                      <FaAngleDoubleRight className="arrows-icon" />{" "}
                      {responsibility}
                    </li>
                  ))}
                </ul>
                <div className="under-line"></div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-parent-container common-container">
        <div>
          <h1 className="experience-title">Technical Skills</h1>
          <div className="under-line"></div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="skils-container">
            <div className="frontend-container">
              <h2>Frontend</h2>

              <ul className="technical-skills-container">
                {myDetails?.frontend?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="frontend-container">
              <h2>Backend</h2>
              <ul className="technical-skills-container">
                {myDetails?.backend?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="frontend-container">
              <h2>Database</h2>

              <ul className="technical-skills-container">
                {myDetails?.database?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="col-parent-container common-container">
        <div>
          <h1 className="experience-title">Education</h1>
          <div className="under-line"></div>
        </div>
        <div className="education-container">
          {educationDetails?.map((education, index) => (
            <div class="education-card" key={index}>
              <div class="big-img-container">
                <img src="https://kitspharma.com/img/about1.jpg" alt="bg-img" />
                <div class="inner-hide-content">
                  <h1>{education.percentage}</h1>
                </div>
              </div>

              <div class="education-info">
                <div class="small-img-container">
                  <img src={myDetails?.profileImage} alt="profile" />
                </div>
                <div class="college">
                  <h3>{education.collegeName}</h3>
                </div>
                <div className="education-year-details">
                  <p class="dates">{education.passingYear}</p>
                  <p class="percentage-chip">
                    Percentage: {education.percentage}
                  </p>
                  <h4 class="specilization">{education.course}</h4>
                  <p class="address">{education.collegeAddress}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={"arrow-btn-icon" + (visible ? "" : "show")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp size={20} />
      </div>
    </div>
  );
};

export default About;
