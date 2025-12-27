import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import AddProjectForm from "./AddProjectForm/AddProjectForm";
import AddYourDetailsForm from "./AddYourDetailsForm/AddYourDetailsForm";
import {
  GET_PROJECTS_API,
  UPDATE_PROJECTS_API,
  DELETE_PROJECTS_API,
  GET_MY_DETAILS_API,
  GET_MY_EXPERIENCE_API,
  DELETE_MY_EXPERIENCE_API,
  UPDATE_MY_EXPERIENCE_API,
} from "../../constants/Constants";
import SnackbarPopup from "../../constants/Snackbar";
import AddExperienceForm from "./AddExperienceForm/AddExperienceForm";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";

const Admin = () => {
  const [filter, setFilter] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddYourDetails, setShowAddYourDetails] = useState(false);
  const [projects, setProjects] = useState([]);
  // const navigate = useNavigate();
  const [addProjectStatus, setAddProjectStatus] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [originalProject, setOriginalProject] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [imagePreview, setImagePreview] = useState("");
  // const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [getMyDetails, setGetMyDetails] = useState([]);
  const [getExperience, setGetExperience] = useState([]);
  const [showProjectsTable, setShowProjectsTable] = useState(false);
  const [showExperienceTable, setShowExperienceTable] = useState(false);
  const [showUpdateDetailsTable, setShowUpdateDetailsTable] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  // const [originalExperience, setOriginalExperience] = useState(null);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(addProjectStatus, "status");

  const fullText = "Admin";

  const { darkAndLightMode } = useSelector((state) => state.services);
  // const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     navigate("/");
  // }

  const toggleAddProjectForm = () => {
    setShowAddProject(!showAddProject);
  };

  const toggleAddYourDetailsForm = () => {
    setShowAddYourDetails(!showAddYourDetails);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const activeFilter = e.target.value;
    switch (activeFilter) {
      case "portfolio":
        setSearchQuery("");
        setShowAddYourDetails(false);
        setShowProjectsTable(false);
        setShowUpdateDetailsTable(false);
        setShowExperienceTable(false);
        // fetchProjects();

        break;
      case "yourDetails":
        setSearchQuery("");
        setShowAddYourDetails(!showAddYourDetails);
        setShowProjectsTable(false);
        setShowUpdateDetailsTable(true);
        setShowExperienceTable(false);
        break;
      case "project":
        setSearchQuery("");
        setShowAddProject(!showAddProject);
        setShowProjectsTable(true);
        setShowUpdateDetailsTable(false);
        setShowExperienceTable(false);

        break;
      case "experience":
        setSearchQuery("");
        setShowAddExperience(!showAddExperience);
        setShowProjectsTable(false);
        setShowUpdateDetailsTable(false);
        setShowExperienceTable(true);

        break;
      case "fullstack":
        break;
      case "javascript":
        break;
      default:
        break;
    }
  };

  //     useEffect(() => {
  //     let index = 0;
  //     const interval = setInterval(() => {
  //       setText(fullText.slice(0, index + 1));
  //       index++;
  //       if (index === fullText.length) clearInterval(interval);
  //     }, 200);

  //     return () => clearInterval(interval);
  //   }, [fullText]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        setTimeout(() => {
          index = 0;
          setText("");
        }, 1000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [showProjectsTable && searchQuery]);

  useEffect(() => {
    fetchMyDetails();
    fetchExperience();
  }, []);

  useEffect(() => {
    fetchSearchExperience();
  }, [showExperienceTable && searchQuery]);

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
  console.log(visible, "visible");

  const fetchMyDetails = async () => {
    try {
      const response = await fetch(`${GET_MY_DETAILS_API}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");
      // const responsData = await response.json();

      if (response.status === 200) {
        const data = await response.json();
        setGetMyDetails(data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getMyDetails, "getMyDetails");
  console.log(getMyDetails[0]?.resumeImage, "getImage");

  const fetchExperience = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${GET_MY_EXPERIENCE_API}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setIsLoading(false);
        setGetExperience(data?.data);
        console.log(data, "data.rows");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchSearchExperience = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${GET_MY_EXPERIENCE_API}${
          showExperienceTable ? "/search?search=" : ""
        }${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setGetExperience(data?.data);
        setIsLoading(false);
        console.log(data, "data.rows");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log(getExperience, "getExperience");

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setLoading(true);
      const response = await fetch(
        `${GET_PROJECTS_API}${
          showProjectsTable ? "/search?search=" : ""
        }${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response, "projects response");
      if (response.status === 200) {
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const filterProjects = () => {
    return (
      <div className="admin-header common-container">
        <div className="search-filter-container">
          <div className="search-container">
            <input
              className={`search-input ${
                showProjectsTable
                  ? "visable"
                  : showExperienceTable
                  ? "visable"
                  : "hidden"
              }`}
              type="search"
              disabled={!showProjectsTable && !showExperienceTable}
              placeholder={
                showProjectsTable
                  ? "Search projects with title name..."
                  : showExperienceTable
                  ? "Search experience with company name..."
                  : "Search"
              }
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => handleFilterChange(e)}
            >
              <option value="portfolio">Portfolio Changes</option>
              <option value="yourDetails">
                {getMyDetails?.[0]?.resumeImage
                  ? "Update Your Details"
                  : "Add Your Details"}
              </option>
              <option value="project">Add Project</option>
              <option value="experience">Add Experience</option>
              {/* <option value="education">Add Education</option> */}
            </select>
          </div>

          <div></div>
        </div>
        <div className="dropdown-container">
          {/* <button 
                                className="add-user-button"
                                onClick={toggleAddProjectForm}
                            >
                                <span className="button-icon">+</span>
                                Add Project
                                <span className="dropdown-arrow">▼</span>
                            </button> */}
          {showAddProject && (
            <AddProjectForm
              onClose={() => setShowAddProject(false)}
              setAddProjectStatus={setAddProjectStatus}
              fetchProjects={fetchProjects}
            />
          )}
        </div>

        <div className="dropdown-container">
          {/* <button 
                                className="add-user-button"
                                onClick={toggleAddYourDetailsForm}
                            >
                                <span className="button-icon">+</span>
                                {getMyDetails?.length > 0 ? "Update Your Details" : "Add Your Details"}
                                <span className="dropdown-arrow">▼</span>
                            </button> */}
          {showAddYourDetails && (
            <AddYourDetailsForm
              onClose={() => setShowAddYourDetails(false)}
              getMyDetails={getMyDetails}
              fetchProjects={fetchProjects}
              fetchMyDetails={fetchMyDetails}
            />
          )}
        </div>
        {/* <button className='logout-button' onClick={handleLogout}>Logout</button> */}

        <div className="dropdown-container">
          {showAddExperience && (
            <AddExperienceForm
              onClose={() => setShowAddExperience(false)}
              getMyDetails={getMyDetails}
              fetchProjects={fetchProjects}
              fetchMyDetails={fetchMyDetails}
              setShowAddExperience={setShowAddExperience}
            />
          )}
        </div>
      </div>
    );
  };

  const handleEditProject = (project) => {
    setOriginalProject(project);
    setEditingProject({ ...project });
    setEditingId(project.id);
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`${DELETE_PROJECTS_API}/${project.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message || "Project deleted successfully",
          severity: "success",
        });
        fetchProjects();
      } else {
        throw new Error(data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleEditExperience = (experience) => {
    setEditingExperienceId(experience.id);

    setEditingExperience({
      ...experience,
      responsibilities: Array.isArray(experience.responsibilities)
        ? experience.responsibilities.join(", ")
        : experience.responsibilities,
    });
  };

  const handleDeleteExperience = async (experience) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      const response = await fetch(
        `${DELETE_MY_EXPERIENCE_API}/${experience.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message || "Experience deleted successfully",
          severity: "error",
        });

        fetchExperience();
      } else {
        throw new Error(data.message || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCancelEditExperience = () => {
    setEditingExperienceId(null);
    setEditingExperience(null);
  };

  const handleSaveExperience = async (experience) => {
    try {
      setLoading(true);
      const experienceToUpdate = {
        ...editingExperience,
        responsibilities: editingExperience.responsibilities,
      };

      const response = await fetch(
        `${UPDATE_MY_EXPERIENCE_API}/${experience.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(experienceToUpdate),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message || "Experience updated successfully",
          severity: "success",
        });
        setLoading(false);
        setEditingExperienceId(null);
        setEditingExperience(null);
        fetchExperience();
      } else {
        setLoading(false);
        throw new Error(data.message || "Failed to update experience");
      }
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
      setLoading(false);
    }
  };

  const handleSaveProject = async (project) => {
    try {
      setLoading(true);
      const response = await fetch(`${UPDATE_PROJECTS_API}/${project.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editingProject),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setSnackbar({
          open: true,
          message: data.message || "Project updated successfully",
          severity: "success",
        });
        setEditingId(null);
        setEditingProject(null);
        fetchProjects();
      } else {
        throw new Error(data.message || "Failed to update project");
        setLoading(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
      setLoading(false);
    }
  };

  const handleCancelEditProject = () => {
    setEditingId(null);
    setEditingProject(null);
    setOriginalProject(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditingProject((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const projectsTableView = () => {
    return (
      <div>
        {" "}
        {projects?.rows?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Technologies</th>
                <th>GitHub Link</th>
                <th>Live Demo Link</th>
                <th>Description</th>
                <th>Project Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.rows?.map((project, index) => (
                <tr
                  key={project.id}
                  className={editingId === project.id ? "editing" : ""}
                >
                  <td style={{ color: "white" }}>{index + 1}</td>

                  <td>
                    {editingId === project.id ? (
                      <>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="file-input"
                          id={`file-input-${project.id}`}
                        />
                        <label htmlFor={`file-input-${project.id}`}>
                          <img
                            src={imagePreview || project.image}
                            alt={project.title}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            className="preview-image"
                          />
                        </label>
                      </>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        className="preview-image"
                      />
                    )}
                  </td>

                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.title || ""
                          : project.title
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.technologies || ""
                          : project.technologies
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.gitUrl || ""
                          : project.gitUrl
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          gitUrl: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.projectLink || ""
                          : project.projectLink
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          projectLink: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.description || ""
                          : project.description
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        editingId === project.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editingId !== project.id}
                      value={
                        editingId === project.id
                          ? editingProject?.projectCategory || ""
                          : project.projectCategory
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          projectCategory: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td>
                    {editingId === project.id ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Save">
                          <button
                            className="btn-save"
                            onClick={() => handleSaveProject(project)}
                          >
                            {loading ? (
                              <CircularProgress
                                size={12}
                                className="circular-color"
                              />
                            ) : (
                              "Save"
                            )}
                          </button>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <button
                            className="btn-cancel"
                            onClick={handleCancelEditProject}
                          >
                            Cancel
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Edit">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditProject(project)}
                          >
                            Edit
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteProject(project)}
                          >
                            Delete
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : isLoading ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <CircularProgress />
          </div>
        ) : (
          <p style={{ textAlign: "center", padding: "1rem" }}>
            No projects found
          </p>
        )}
      </div>
    );
  };

  const experienceTableView = () => {
    return (
      <div>
        {getExperience?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Company</th>
                <th>Position</th>
                <th>Duration</th>
                <th>Responsibilities</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getExperience?.map((experience, index) => {
                const isEditing = editingExperienceId === experience.id;
                const currentExp = isEditing ? editingExperience : experience;

                return (
                  <tr key={experience.id || index}>
                    <td style={{ color: "white" }}>{index + 1}</td>
                    <td>
                      <input
                        readOnly={!isEditing}
                        className={
                          isEditing ? "editable-input" : "readonly-input"
                        }
                        value={currentExp.company || ""}
                        onChange={(e) =>
                          setEditingExperience({
                            ...editingExperience,
                            company: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        readOnly={!isEditing}
                        className={
                          isEditing ? "editable-input" : "readonly-input"
                        }
                        value={currentExp.position || ""}
                        onChange={(e) =>
                          setEditingExperience({
                            ...editingExperience,
                            position: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        readOnly={!isEditing}
                        className={
                          isEditing ? "editable-input" : "readonly-input"
                        }
                        value={currentExp.duration || ""}
                        onChange={(e) =>
                          setEditingExperience({
                            ...editingExperience,
                            duration: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        //  rows="4"
                        //  cols="50"
                        readOnly={!isEditing}
                        className={
                          isEditing ? "editable-input" : "readonly-input"
                        }
                        value={
                          Array.isArray(currentExp.responsibilities)
                            ? currentExp.responsibilities.join(", ")
                            : currentExp.responsibilities || ""
                        }
                        onChange={(e) =>
                          setEditingExperience({
                            ...editingExperience,
                            responsibilities: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      {isEditing ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            margin: "0 auto",
                            padding: "0px",
                          }}
                        >
                          <Tooltip title="Save">
                            <button
                              className="btn-save"
                              onClick={() => handleSaveExperience(experience)}
                            >
                              {loading ? (
                                <CircularProgress
                                  className="circular-color"
                                  size={12}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <button
                              className="btn-cancel"
                              onClick={handleCancelEditExperience}
                            >
                              Cancel
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            margin: "0 auto",
                            padding: "0px",
                          }}
                        >
                          <Tooltip title="Edit">
                            <button
                              className="btn-edit"
                              onClick={() => handleEditExperience(experience)}
                            >
                              Edit
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteExperience(experience)}
                            >
                              Delete
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : isLoading ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <CircularProgress />
          </div>
        ) : (
          <p style={{ textAlign: "center", padding: "1rem" }}>
            No experience found
          </p>
        )}
      </div>
    );
  };

  console.log(projects, "projects");

  return (
    <div
      className={`admin-page-container all-pages-container ${
        darkAndLightMode
          ? "dark-bg-parent-container"
          : "light-bg-parent-container"
      }`}
    >
      <h2 className="admin-welcome-text">
        Welcome {text}
        <span className="cursor">|</span>
      </h2>

      {filterProjects()}
      {showProjectsTable && projectsTableView()}
      {showUpdateDetailsTable && (
        <h5 style={{ textAlign: "center", marginBottom: "1rem" }}>
          You can update your details only
        </h5>
      )}
      {showExperienceTable && experienceTableView()}
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
        onClose={() => setSnackbar({ open: false })}
      />
      <div
        className={visible ? "arrow-btn-icon" : "hide-arrow-btn"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp size={20} style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default Admin;
