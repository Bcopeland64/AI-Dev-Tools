import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCurriculum = async () => {
    const response = await axios.get(`${API_URL}/curriculum`);
    return response.data;
};

export const runCode = async (code) => {
    const response = await axios.post(`${API_URL}/run`, { code });
    return response.data;
};
