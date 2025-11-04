export const API = "http://localhost:5000";
// "https://sai-portfolio-ngsu.onrender.com" || "http://localhost:5000";

export const LOGIN_API = `${API}/api/login`;
export const REGISTER_API = `${API}/api/register`;

//Projects
export const ADD_PROJECTS_API = `${API}/api/projects`;
export const GET_PROJECTS_API = `${API}/api/projects`;
export const UPDATE_PROJECTS_API = `${API}/api/projects`;
export const DELETE_PROJECTS_API = `${API}/api/projects`;

//My Details
export const ADD_MY_DETAILS_API = `${API}/api/my-details`;
export const GET_MY_DETAILS_API = `${API}/api/my-details`;
export const UPDATE_MY_DETAILS_API = `${API}/api/my-details`;
export const DELETE_MY_DETAILS_API = `${API}/api/my-details`;

//My Experience
export const ADD_MY_EXPERIENCE_API = `${API}/api/my-experience`;
export const GET_MY_EXPERIENCE_API = `${API}/api/my-experience`;
export const UPDATE_MY_EXPERIENCE_API = `${API}/api/my-experience`;
export const DELETE_MY_EXPERIENCE_API = `${API}/api/my-experience`;

//Mail
export const SEND_MAIL_API = `${API}/api/send-alert`;

export const FETCH_DATA = async (url, method, body) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};
