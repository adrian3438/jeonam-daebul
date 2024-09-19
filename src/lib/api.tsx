import axios from "axios";

const instance = axios.create({
    baseURL : 'https://marineplaza.org/dim-api/controller',
})

export default instance;