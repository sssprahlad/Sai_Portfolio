import React, { useRef, useEffect } from "react";
import "./AddProjectForm.css";
import { useState } from "react";
import { FETCH_DATA, ADD_PROJECTS_API } from "../../../constants/Constants";
import SnackbarPopup from "../../../constants/Snackbar";
import { CircularProgress } from "@mui/material";

const AddProjectForm = ({ onClose, setAddProjectStatus, fetchProjects }) => {
  const [projectData, setProjectData] = useState({
    image: "",
    title: "",
    technologies: "",
    gitUrl: "",
    projectLink: "",
    description: "",
    projectCategory: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProjectData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value:`, value);
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProject = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(projectData, "projectData");
    try {
      const response = await FETCH_DATA(ADD_PROJECTS_API, "POST", projectData);
      console.log(response);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
        setLoading(false);
        setTimeout(() => {
          onClose();
          fetchProjects();
        }, 1000);
        setImagePreview("");
        setProjectData({
          image: "",
          title: "",
          technologies: "",
          githubLink: "",
          deployedLink: "",
          description: "",
          projectCategory: "",
        });

        setAddProjectStatus(true);
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
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
      <div className="add-project-form-container common-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleAddProject} className="add-project-form">
          <h2>Add Project Details</h2>

          <div className="form-group">
            <label htmlFor="projectImage">Project Image</label>
            <div
              className="file-upload-container"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <div>
                  <div className="upload-text">Click to upload an image</div>
                  <div
                    style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}
                    className="upload-text"
                  >
                    Recommended size: 800x600px
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                id="projectImage"
                name="projectImage"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              id="title"
              name="title"
              value={projectData.title}
              onChange={handleChangeInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies (comma separated)</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={projectData.technologies}
              onChange={handleChangeInput}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link</label>
            <input
              type="url"
              id="gitUrl"
              name="gitUrl"
              value={projectData.gitUrl}
              onChange={handleChangeInput}
              placeholder="https://github.com/username/project"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deployedLink">Live Demo Link</label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              value={projectData.projectLink}
              onChange={handleChangeInput}
              placeholder="https://your-project-demo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectCategory">Project Category</label>
            <input
              type="text"
              id="projectCategory"
              name="projectCategory"
              value={projectData.projectCategory}
              onChange={handleChangeInput}
              placeholder="e.g. Html, Javascript, React, Mern stack, Java full stack"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="text-area"
              rows="4"
              cols="50"
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleChangeInput}
              placeholder="Enter project description"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">
              {" "}
              {loading ? (
                <CircularProgress size={12} color="inherit" />
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
