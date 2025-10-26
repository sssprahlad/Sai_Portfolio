import React, { useState,useEffect,useRef } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import AddProjectForm from './AddProjectForm/AddProjectForm';
import AddYourDetailsForm from './AddYourDetailsForm/AddYourDetailsForm';
import { GET_PROJECTS_API, UPDATE_PROJECTS_API,DELETE_PROJECTS_API,GET_MY_DETAILS_API    } from "../../constants/Constants";
import SnackbarPopup from "../../constants/Snackbar";


const Admin = () => {
    const [filter, setFilter] = useState('');
    const [showAddProject, setShowAddProject] = useState(false);
    const [showAddYourDetails, setShowAddYourDetails] = useState(false);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [addProjectStatus, setAddProjectStatus] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [originalProject, setOriginalProject] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
      });
      const [imagePreview, setImagePreview] = useState("");
      const fileInputRef = useRef(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [loading, setLoading] = useState(false);
      const [getMyDetails,setGetMyDetails] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const toggleAddProjectForm = () => {
        setShowAddProject(!showAddProject);
    }

    const toggleAddYourDetailsForm = () => {
        setShowAddYourDetails(!showAddYourDetails);
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        const activeFilter = e.target.value;
        switch(activeFilter){
            case "yourDetails":
                setShowAddYourDetails(!showAddYourDetails);
                break;
            case "project":
                setShowAddProject(!showAddProject);
                break;
            case "fullstack":
                break;
            case "javascript":
                break;
            default:
                break;
        }
    }
         



    useEffect(() => {
        fetchProjects();
    },[searchQuery]);

    useEffect(() => {
        fetchMyDetails();
    }, []); 


    const fetchMyDetails = async () => {
        try {
            const response = await fetch(`${GET_MY_DETAILS_API}`,{
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                    
                        }); 
            console.log(response,"response");
            // const responsData = await response.json();

            

            if (response.status === 200) {
                const data = await response.json();
                setGetMyDetails(data.rows);

            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(getMyDetails,"getMyDetails");
    console.log(getMyDetails[0]?.resumeImage,"getImage");

  

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${GET_PROJECTS_API}/search?search=${searchQuery}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
        
            });
            console.log(response,"projects response");
            if (response.status === 200) {
                const data = await response.json();
                setProjects(data);
                setSnackbar({
                    open: true,
                    message: data.message,
                    severity: 'success'
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setSnackbar({
                open: true,
                message: error.message,
                severity: 'error'
              });
        }
    }

    const filterProjects = () => {
        return (
            <div className='admin-header'>
                <div className='search-filter-container'>
                    <div className='search-container'>
                        <input 
                            className='search-input' 
                            type="search" 
                            placeholder='Search projects with title name...'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='filter-container'>  
                        <select 
                            className='filter-select' 
                            value={filter} 
                            onChange={(e) => handleFilterChange(e)}
                        >
                            <option value="">Portfolio Changes</option>
                            <option value="yourDetails">Update Your Details</option>
                            <option value="project">Add Project</option>
                            <option value="fullstack">Full Stack Projects</option>
                            <option value="javascript">JavaScript Projects</option>
                        </select>
                    </div>

                   <div>

                   </div>



                </div>
                    <div className="dropdown-container">
                            <button 
                                className="add-user-button"
                                onClick={toggleAddProjectForm}
                            >
                                <span className="button-icon">+</span>
                                Add Project
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            {showAddProject && (
                                <AddProjectForm onClose={() => setShowAddProject(false)} setAddProjectStatus={setAddProjectStatus} />
                            )}
                           
                    </div>

                    <div className='dropdown-container'>
                        <button 
                                className="add-user-button"
                                onClick={toggleAddYourDetailsForm}
                            >
                                <span className="button-icon">+</span>
                                {getMyDetails?.length > 0 ? "Update Your Details" : "Add Your Details"}
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            {showAddYourDetails && (
                                <AddYourDetailsForm onClose={() => setShowAddYourDetails(false)} getMyDetails={getMyDetails} fetchProjects={fetchProjects} fetchMyDetails={fetchMyDetails} />
                            )}
                    </div>
                        <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>

        )
    }

    const handleEditProject = (project) => {
        setOriginalProject(project);
        setEditingProject({...project});
        setEditingId(project.id);
    }

   const handleDeleteProject = async (project) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
        return;
    }

    try {
        const response = await fetch(`${DELETE_PROJECTS_API}/${project.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            setSnackbar({
                open: true,
                message: data.message || "Project deleted successfully",
                severity: 'success'
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
            severity: 'error'
        });
    }
}

   const handleSaveProject = async (project) => {
    try {
        const response = await fetch(`${UPDATE_PROJECTS_API}/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(editingProject)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            setSnackbar({
                open: true,
                message: data.message || "Project updated successfully",
                severity: 'success'
            });
            setEditingId(null);
            setEditingProject(null);
            fetchProjects();
        } else {
            throw new Error(data.message || "Failed to update project");
        }
    } catch (error) {
        console.error("Update error:", error);
        setSnackbar({
            open: true,
            message: error.message,
            severity: 'error'
        });
    }
}

    const handleCancelEditProject = () => {
        setEditingId(null);
        setEditingProject(null);
        setOriginalProject(null);
    }   

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setEditingProject(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };  



    const projectsTableView = () => {   
        return (
            <div>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                  <tbody>
  {projects?.rows?.map((project) => (
    <tr key={project.id} className={editingId === project.id ? 'editing' : ''}>
      <td>{project.id}</td>

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
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                className="preview-image"
              />
            </label>
          </>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            className="preview-image"
          />
        )}
      </td>

      <td>
        <input
          type="text"
          className={editingId === project.id ? 'editable-input' : 'readonly-input'}
          readOnly={editingId !== project.id}
          value={editingId === project.id ? (editingProject?.title || '') : project.title}
          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          className={editingId === project.id ? 'editable-input' : 'readonly-input'}
          readOnly={editingId !== project.id}
          value={editingId === project.id ? (editingProject?.technologies || '') : project.technologies}
          onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
        />
      </td>
      <td>  
        <input
          type="text"
          className={editingId === project.id ? 'editable-input' : 'readonly-input'}
          readOnly={editingId !== project.id}
          value={editingId === project.id ? (editingProject?.gitUrl || '') : project.gitUrl}
          onChange={(e) => setEditingProject({ ...editingProject, gitUrl: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          className={editingId === project.id ? 'editable-input' : 'readonly-input'}
          readOnly={editingId !== project.id}
          value={editingId === project.id ? (editingProject?.projectLink || '') : project.projectLink}
          onChange={(e) => setEditingProject({ ...editingProject, projectLink: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          className={editingId === project.id ? 'editable-input' : 'readonly-input'}
          readOnly={editingId !== project.id}
          value={editingId === project.id ? (editingProject?.description || '') : project.description}
          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
        />
      </td>
     

      <td>
        {editingId === project.id ? (
          <div style={{ display: "flex", gap: "0.5rem", margin: "0 auto", padding: "0px" }}>
            <button className="btn-save" onClick={() => handleSaveProject(project)}>Save</button>
            <button className="btn-cancel" onClick={handleCancelEditProject}>Cancel</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem", margin: "0 auto", padding: "0px" }}>
            <button className="btn-edit" onClick={() => handleEditProject(project)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDeleteProject(project)}>Delete</button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>



                </table>
            </div>
        )
    }

    


  console.log(projects, "projects");

    return (
        <div className='admin-page-container'>
           {filterProjects()}
           {projectsTableView()}
           <SnackbarPopup 
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            setSnackbar={setSnackbar}
            onClose={() => setSnackbar({ open: false })}
            />
            
        </div>
    );
};

export default Admin;