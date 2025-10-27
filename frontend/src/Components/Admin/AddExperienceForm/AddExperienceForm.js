import React, { useState,useEffect} from "react";
import './AddExperienceForm.css';
import { FETCH_DATA, ADD_MY_EXPERIENCE_API } from "../../../constants/Constants";
import SnackbarPopup from "../../../constants/Snackbar";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

const AddExperienceForm = ({ onClose, setShowAddExperience }) => {
    const [experienceData, setExperienceData] = useState({
        company: "",
        position: "",
        duration: "",
        responsibilities: ""
    });
     const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
      });

 

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setExperienceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleAddExperience = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await FETCH_DATA(ADD_MY_EXPERIENCE_API, "POST", experienceData);
            console.log(response, "add experience");
            
            if (response.status === 200) { 
                setSnackbar({
                    open: true,
                    message: response.message || "Experience added successfully",
                    severity: 'success'
                });
                
                setExperienceData({
                    company: "",
                    position: "",
                    duration: "",
                    responsibilities: ""
                });

                setTimeout(() => {
                    onClose();
                    setShowAddExperience(false);
                }, 1000);
            } else {
                throw new Error(response.message || "Failed to add experience");
            }
        } catch (error) {
            console.error("Error adding experience:", error);
            setSnackbar({
                open: true,
                message: error.message || "An error occurred while adding experience",
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        onClose();
    }

    const handleClickOutside = (e) => {
        if (e.target.classList.contains('add-project-form-overlay')) {
            onClose();
        }
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="add-project-form-overlay" onClick={handleClickOutside}>
            <div className="add-project-form-container common-container">
                <button className="close-button" onClick={onClose}>&times;</button>
                <form onSubmit={handleAddExperience} className="add-project-form">
                    <h2>Add Experience Details</h2>

                    <div className="form-group">
                        <label htmlFor="company">Company Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter company name"
                            id="company" 
                            name="company" 
                            value={experienceData.company}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input 
                            type="text" 
                            placeholder="Enter position"
                            id="position" 
                            name="position" 
                            value={experienceData.position}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration</label>
                        <input 
                            type="text" 
                            placeholder="Enter duration"
                            id="duration" 
                            name="duration" 
                            value={experienceData.duration}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="responsibilities">Responsibilities</label>
                        <textarea 
                        rows="4"
                        cols="50"
                        className="text-area"
                            placeholder="Enter responsibilities"
                            id="responsibilities" 
                            name="responsibilities" 
                            value={experienceData.responsibilities}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                   

                    <div className="form-actions">
                        <button type="button" onClick={handleCancel} disabled={loading}>
                            Cancel
                        </button>
                        <Button className="mui-button"
                            type="submit"
                            color="secondary"
                            size="small"
                            variant="contained"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress color="inherit" /> : <SaveIcon />}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
               <SnackbarPopup 
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            setSnackbar={setSnackbar}
            onClose={() => setSnackbar({ open: false })}
            />
            
            </div>
        </div>
    );
};

export default AddExperienceForm;
