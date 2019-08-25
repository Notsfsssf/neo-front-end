import axios from 'axios'
const localUrl="http://localhost:8080/api/"
const remoteUrl="https://perol.me/api/"
const axiosx = axios.create({
    baseURL:remoteUrl,
})
export default axiosx