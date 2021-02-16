/* eslint-disable import/no-anonymous-default-export */
export default {
    PORT: process.env.PORT || 8000,
    API_BASE_URL:
        process.env.API_BASE_URL || `https://reflect-server.herokuapp.com/api`,
    TOKEN_KEY: process.env.TOKEN_KEY || 'reflect-token',
};