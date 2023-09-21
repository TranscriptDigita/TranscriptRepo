import axios from 'axios'

const API_URL = 'https://transcriptdigita-api.onrender.com/api/v1/alumnus/'

// Updated register service
const register = async (userData) => {
    // Extract fields and rest of the user data
    const {
        degreeType,
        faculty,
        department,
        matricNumber,
        yearOfGraduation,
        program,
        ...restUserData
    } = userData;

    // Validate and format the data
    const requestData = {
        degreeType: String(degreeType).trim(), // Ensure it's a string and trim any extra spaces
        faculty: String(faculty).trim(),
        department: String(department).trim(),
        matricNumber: String(matricNumber).trim(),
        yearOfGraduation: new Date(yearOfGraduation), // Convert to Date format
        program: String(program).trim(),
        ...restUserData, // Include any other user data
    };

    // Send a POST request to the API
    const response = await axios.post(API_URL, requestData);

    if (response.data) {
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Store the user data in localStorage
    }

    return response.data;
};
