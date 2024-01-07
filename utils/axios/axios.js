const axios = require('axios');
const config = require('../config');

const axiosGET = async (url, token) => {
    const response = await axios.get(`${config.URL}api/v1/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

const axiosPOST = async (url, token) => {
    const response = await axios.post(`${config.URL}api/v1/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

module.exports = {
    axiosGET,
    axiosPOST
}