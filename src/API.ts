import axios from 'axios'
const localUrl="http://localhost:8080/api/"
const remoteUrl="https://perol.ltd/api/"
const remoteUrlI="https://perol.fun/api/"
const axiosx = axios.create({
    baseURL:remoteUrlI,
})
export default axiosx