import axios from 'axios'
const localUrl="http://localhost:8080/api/"
const remoteUrl="https://perol.fun/api/"
const axiosx = axios.create({
    baseURL:localUrl,
})
export default axiosx