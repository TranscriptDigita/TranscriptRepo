import axios from 'axios';

const API_URL = 'https://dacs.onrender.com/api/v1/institution';

// Function to handle storing data in local storage
const saveInstitutionUserData = (userData) => {
  localStorage.setItem('institutionUser', JSON.stringify(userData));
};

// Function to get institution user data from local storage
const getInstitutionUserData = () => {
  const storedUserData = localStorage.getItem('institutionUser');
  return storedUserData ? JSON.parse(storedUserData) : null;
};

export const registerInstitution = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    const institutionUserData = response.data;
    saveInstitutionUserData(institutionUserData);
    console.log('Institution data after registration:', institutionUserData);
    return institutionUserData;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

//Verify an institution's email
export const verifyInstitutionEmail = async (id, verificationCode) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/verify`, { verificationCode, id });
    const institutionUserData = response.data;
    saveInstitutionUserData(institutionUserData);
    console.log('Institution data after email verification:', institutionUserData);
    localStorage.clear();
    return institutionUserData;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};




// account verfification service
// const verify = async (userData) => {
//     const response = await axios.patch(`${API_URL}${userData.id}/verify`, userData)

//     if(response.data) {
//         localStorage.setItem('user', JSON.stringify(response.data))
//     }

//     return response.data
// }




// Login an institution
export const loginInstitution = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    const institutionUserData = response.data;
    saveInstitutionUserData(institutionUserData);
    console.log('Institution data after login:', institutionUserData);
    return institutionUserData;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout an institution (remove data from local storage)
export const logoutInstitution = () => {
  localStorage.removeItem('institutionUser');
  console.log('Institution data cleared after logout.');
};

const institutionService = {
  registerInstitution,
  verifyInstitutionEmail,
  loginInstitution,
  logoutInstitution,
};

export default institutionService;
