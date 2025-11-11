import "./Footer.css";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Footer = () => {
  const navigate = useNavigate();
  const { darkAndLightMode, myDetails } = useSelector(
    (state) => state.services
  );
  console.log(darkAndLightMode, "darkAndLightMode");
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <ul>
            {/* <Tooltip title="Go to Home"> */}
            <li
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </li>
            {/* </Tooltip>
            <Tooltip title="Go to About"> */}
            <li
              onClick={() => {
                navigate("/about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              About
            </li>
            {/* </Tooltip>
            <Tooltip title="Go to Projects"> */}
            <li
              onClick={() => {
                navigate("/projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Projects
            </li>
            {/* </Tooltip>
            <Tooltip title="Go to Contact"> */}
            <li
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Contact
            </li>
            {/* </Tooltip> */}
          </ul>
        </div>

        <div className="footer-icons-content">
          <ul>
            <li>
              {" "}
              <Tooltip title="Instagram">
                <a className="footer-icon" href={myDetails?.instagram}>
                  <FaInstagram />
                </a>
              </Tooltip>
            </li>
            <li>
              {" "}
              <Tooltip title="Github">
                <a className="footer-icon" href={myDetails?.github}>
                  <FaGithub />
                </a>
              </Tooltip>
            </li>
            <li>
              {" "}
              <Tooltip title="Linkedin">
                <a className="footer-icon" href={myDetails?.linkedIn}>
                  <FaLinkedin />
                </a>
              </Tooltip>
            </li>
            <li>
              {" "}
              <Tooltip title="Twitter">
                <a className="footer-icon" href={myDetails?.twitter}>
                  <FaTwitter />
                </a>
              </Tooltip>
            </li>
          </ul>
        </div>

        <div className="footer-content">
          <p>© {myDetails?.copyRightYear} Sai Prahlad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
