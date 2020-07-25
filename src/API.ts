import axios from 'axios'
const localUrl="http://localhost:8080/api/"
const remoteUrl="https://perol.ltd/api/"
const axiosx = axios.create({
    baseURL:remoteUrl,
})
export default axiosx