import "./Footer.css";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
    const {darkAndLightMode, myDetails} = useSelector((state) => state.services);
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                   <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Projects</li>
                    <li>Contact</li>
                   </ul>
                </div>

                <div className="footer-icons-content">
                    <ul>
                        <li > <a className="footer-icon" href={myDetails?.instagram}><FaInstagram /></a></li>
                        <li > <a className="footer-icon" href={myDetails?.github}><FaGithub /></a></li>
                        <li > <a className="footer-icon" href={myDetails?.linkedIn}><FaLinkedin /></a></li>
                        <li > <a className="footer-icon" href={myDetails?.twitter}><FaTwitter /></a></li>
                    </ul>
                </div>

                <div className="footer-content">
                    <p>© 2025 Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;