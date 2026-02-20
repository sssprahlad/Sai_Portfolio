import React, { useEffect } from "react";
import { useState } from "react";
import "./Contact.css";
import { useSelector } from "react-redux";
import { FaMobileAlt } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { SEND_MAIL_API } from "../../../constants/Constants";
import SnackbarPopup from "../../../constants/Snackbar";
import { LuSend } from "react-icons/lu";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";

const Contact = () => {
  const { darkAndLightMode, myDetails } = useSelector(
    (state) => state.services,
  );
  const [loading, setLoading] = useState(false);

  const [mailDetails, setMailDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactDetailsEmpty, setContactDetailsEmpty] = useState(false);
  const [visible, setVisible] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [copyTextStatus, setCopyTextStatus] = useState(false);

  console.log(contactDetailsEmpty, "contactDetailsEmpty");

  const contactDetails = [
    {
      id: 1,
      icon: <FaMobileAlt />,
      title: "Phone Number",
      description: myDetails?.phone,
    },
    {
      id: 2,
      icon: <TbMailShare />,
      title: "Email",
      description: myDetails?.email,
    },
    {
      id: 3,
      icon: <FaHouseUser />,
      title: "Address",
      description: myDetails?.address,
    },
    {
      id: 4,
      icon: <FaGlobeAmericas />,
      title: "Website",
      description: myDetails?.portfolioLink,
    },
  ];

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setMailDetails({ ...mailDetails, [name]: value });
  };

  const handleSubmitContactDetails = () => {
    console.log(mailDetails);

    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(SEND_MAIL_API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailDetails),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
        });
        setContactDetailsEmpty(true);
        setMailDetails({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "error",
        });
      }
      setLoading(false);
    };

    if (mailDetails.name && mailDetails.email && mailDetails.message) {
      fetchData();
    } else {
      setSnackbar({
        open: true,
        message: "Please fill all the fields.",
        severity: "error",
      });
    }
  };

  const handleSnackbarCall = (copy) => {
    setSnackbar({
      open: true,
      message: `Copied! ${copy}`,
      severity: "success",
    });
  };

  const handleCopy = (copyText) => {
    if (copyText.title === "Phone Number") {
      navigator.clipboard.writeText(copyText.description);
      setCopyTextStatus(true);
      setTimeout(() => {
        setCopyTextStatus(false);
      }, 1000);
      handleSnackbarCall(copyText.title);
    } else if (copyText.title === "Email") {
      navigator.clipboard.writeText(copyText.description);
      setCopyTextStatus(true);
      setTimeout(() => {
        setCopyTextStatus(false);
      }, 1000);
      handleSnackbarCall(copyText.title);
    } else if (copyText.title === "Address") {
      navigator.clipboard.writeText(copyText.description);
      setCopyTextStatus(true);
      setTimeout(() => {
        setCopyTextStatus(false);
      }, 1000);
      handleSnackbarCall(copyText.title);
    } else if (copyText.title === "Website") {
      navigator.clipboard.writeText(copyText.description);
      setCopyTextStatus(true);
      setTimeout(() => {
        setCopyTextStatus(false);
      }, 1000);
      handleSnackbarCall(copyText.title);
    }
  };

  //   useEffect(() => {
  //     if (contactDetailsEmpty) {
  //       setMailDetails({
  //         name: "",
  //         email: "",
  //         message: "",
  //       });
  //       setTimeout(() => {
  //         setContactDetailsEmpty(false);
  //       }, 1000);
  //     }
  //   }, [contactDetailsEmpty]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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
      <div className="col-parent-container common-container pl-2">
        <div>
          <h1 className="experience-title">Get in touch</h1>
          <div className="under-line"></div>
        </div>

        <div className="row-parent-container">
          <div className="contact-container1">
            <h2 className="contact-us-text">Contact Us</h2>
            <div className="contact-us-container contact-height">
              {contactDetails?.map((contact, index) => (
                <Tooltip
                  title={`${copyTextStatus ? "Copied" : "Copy"} ${
                    contact.title
                  }`}
                  placement="bottom-end"
                >
                  <div
                    className="contact-alignment"
                    key={index}
                    onClick={() => {
                      handleCopy(contact);
                    }}
                  >
                    <div>
                      {/* <span className='conatct-us-icons'> {contact.icon}</span> */}
                      {contact.icon}
                    </div>
                    <div className="contact-description">
                      <p>{contact.description}</p>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="contact-container1 ">
            <h2 className="send-me-text">Send me a Message</h2>
            <div className="contact-us-container">
              <Tooltip title="Name" placement="bottom-end">
                <div className="contact-alignment">
                  <input
                    classNam="contact-input"
                    value={mailDetails.name}
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </Tooltip>

              <Tooltip title="Email" placement="bottom-end">
                <div className="contact-alignment">
                  <input
                    classNam="contact-input"
                    value={mailDetails.email}
                    type="text"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </Tooltip>
              <Tooltip title="Message" placement="bottom-end">
                <div className="contact-alignment">
                  <textarea
                    value={mailDetails.message}
                    placeholder="Enter Your Message"
                    cols="11"
                    rows="4"
                    name="message"
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </Tooltip>
              <Tooltip title={"Send Message"} placement="bottom-end">
                <div
                  className="send-message-btn"
                  onClick={handleSubmitContactDetails}
                >
                  {loading ? (
                    <CircularProgress
                      size={20}
                      style={{ color: "white", margin: "0rem 0.2rem" }}
                    />
                  ) : null}

                  <p>Send Message </p>
                  <LuSend className="send-icon" />
                </div>
              </Tooltip>
            </div>
            <SnackbarPopup
              open={snackbar.open}
              message={snackbar.message}
              severity={snackbar.severity}
              setSnackbar={setSnackbar}
            />
          </div>
        </div>
      </div>

      <div className="common-container col-parent-container">
        <div>
          <h1 className="experience-title">Location</h1>
          <div className="under-line"></div>
        </div>

        <iframe
          src={myDetails?.location}
          width={"100%"}
          height={"400px"}
          style={{ border: 0 }}
          title="Location Map"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div
        className={visible ? "arrow-btn-icon" : "hide-arrow-btn"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp size={20} style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default Contact;
