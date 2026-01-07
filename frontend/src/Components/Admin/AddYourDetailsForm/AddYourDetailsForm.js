import React, { useRef, useEffect } from "react";
import "./AddYourDetailsForm.css";
import { useState } from "react";
import { ADD_MY_DETAILS_API, API } from "../../../constants/Constants";
import SnackbarPopup from "../../../constants/Snackbar";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const AddYourDetailsForm = ({
  onClose,
  getMyDetails,
  fetchProjects,
  fetchMyDetails,
}) => {
  const [yourDetailsData, setYourDetailsData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
    linkedIn: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    location: "",
    frontend: "",
    backend: "",
    database: "",
    description: "",
    copyRightYear: "",
    portfolioLink: "",
  });
  const [resume, setResume] = useState(null);
  // const { darkAndLightMode } = useSelector((state) => state.services);
  const [loading, setLoading] = useState(false);

  console.log(resume, "resume");
  console.log(getMyDetails, " getMyDetails");

  useEffect(() => {
    if (getMyDetails?.length > 0) {
      setYourDetailsData(getMyDetails[0]);
    }
  }, [getMyDetails]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [yourImagePreview, setYourImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setYourImagePreview(reader.result);
        setYourDetailsData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value:`, value);
    setYourDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUpdateYourDetails = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      // Only append fields that have values
      Object.entries(yourDetailsData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      // Append file if it exists
      if (resume) {
        formData.append("resume", resume);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const isUpdate = getMyDetails?.[0]?.id;
      const url = isUpdate
        ? `${ADD_MY_DETAILS_API}/${getMyDetails[0].id}`
        : ADD_MY_DETAILS_API;

      console.log(`Sending ${isUpdate ? "PATCH" : "POST"} request to:`, url);
      console.log("Form data:", Object.fromEntries(formData));

      const response = await fetch(url, {
        method: isUpdate ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set the Content-Type with the correct boundary
        },
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to save details");
      }

      setSnackbar({
        open: true,
        message: isUpdate
          ? "Details updated successfully"
          : "Details added successfully",
        severity: "success",
      });

      // Refresh data and close form
      fetchMyDetails();
      fetchProjects();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to save details. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("add-project-form-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="add-project-form-overlay" onClick={handleClickOutside}>
      <div className={`add-project-form-container common-container`}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form
          onSubmit={handleAddUpdateYourDetails}
          className="add-project-form"
        >
          <h2>
            {getMyDetails?.[0]?.resumeImage
              ? "Update Your Details"
              : "Add Your Details"}
          </h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              id="name"
              name="name"
              value={yourDetailsData.name}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={yourDetailsData.email}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              placeholder="Enter your phone number"
              id="phone"
              name="phone"
              value={yourDetailsData.phone}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              id="address"
              name="address"
              value={yourDetailsData.address}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label>Resume</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="upload-button"
                onClick={() => document.getElementById("resume").click()}
              >
                Choose File
              </button>
              <span className="file-name">
                {resume
                  ? resume.name
                  : getMyDetails?.resume
                  ? getMyDetails.resume.split("/").pop()
                  : getMyDetails[0]?.resumeName
                  ? getMyDetails[0]?.resumeName
                  : "No file chosen"}
              </span>
            </div>

            {getMyDetails?.[0]?.resumeImage && (
              <div>
                <h2>Previous Resume</h2>
                <iframe
                  title="Previous Resume"
                  src={`${API}/${getMyDetails[0]?.resumePath}`}
                  width="100%"
                  height="600px"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="linkedIn">LinkedIn</label>
            <input
              type="url"
              placeholder="Enter your LinkedIn profile URL"
              id="linkedIn"
              name="linkedIn"
              value={yourDetailsData.linkedIn}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              type="url"
              placeholder="Enter your GitHub profile URL"
              id="github"
              name="github"
              value={yourDetailsData.github}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="url"
              placeholder="Enter your Twitter profile URL"
              id="twitter"
              name="twitter"
              value={yourDetailsData.twitter}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="url"
              placeholder="Enter your Facebook profile URL"
              id="facebook"
              name="facebook"
              value={yourDetailsData.facebook}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              placeholder="Enter your Instagram profile URL"
              id="instagram"
              name="instagram"
              value={yourDetailsData.instagram}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input
              type="url"
              placeholder="Enter your WhatsApp profile URL"
              id="whatsapp"
              name="whatsapp"
              value={yourDetailsData.whatsapp}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              id="location"
              name="location"
              value={yourDetailsData.location}
              onChange={handleChangeInput}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="frontend">Frontend (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Next.js, Angular"
              id="frontend"
              name="frontend"
              value={yourDetailsData.frontend}
              onChange={handleChangeInput}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="backend">Backend (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Node.js, Express.js, Django"
              id="backend"
              name="backend"
              value={yourDetailsData.backend}
              onChange={handleChangeInput}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="database">Database (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. MySQL, MongoDB, PostgreSQL"
              id="database"
              name="database"
              value={yourDetailsData.database}
              onChange={handleChangeInput}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows="4"
              cols="50"
              className="text-area"
              placeholder="Enter your description"
              id="description"
              name="description"
              value={yourDetailsData.description}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="copyRightYear">Copy Right Year</label>
            <input
              type="text"
              placeholder="Enter your copy right year"
              id="copyRightYear"
              name="copyRightYear"
              value={yourDetailsData.copyRightYear}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="portfolioLink">My Portfolio Link</label>
            <input
              type="text"
              placeholder="Enter your portfolio link"
              id="portfolioLink"
              name="portfolioLink"
              value={yourDetailsData.portfolioLink}
              onChange={handleChangeInput}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectImage">Profile Image</label>
            <div
              className="file-upload-container"
              onClick={() => fileInputRef.current.click()}
            >
              {yourImagePreview || getMyDetails[0]?.profileImage ? (
                <img
                  src={yourImagePreview || getMyDetails[0]?.profileImage}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div>Click to upload an image</div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      marginTop: "0.5rem",
                    }}
                  >
                    Recommended size: 800x600px
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                id="yourProfileImage"
                name="yourProfileImage"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">
              {loading ? (
                <CircularProgress size={12} color="inherit" />
              ) : getMyDetails?.[0]?.resumeImage ? (
                "Update Details"
              ) : (
                "Add Details"
              )}
            </button>
          </div>
        </form>
      </div>
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default AddYourDetailsForm;
