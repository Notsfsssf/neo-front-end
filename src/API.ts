import axios from 'axios'
const axiosx = axios.create({
    baseURL:"http://localhost:8080/api/",
})
export default axiosx