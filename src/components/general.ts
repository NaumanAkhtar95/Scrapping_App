
import axios from "axios";

export const server = "http://localhost:5000"

export const getData = (route: string, data?: any) => {
    return axios.post(`${server}/${route}`, data).then((res) => {
        return res
    }).catch((err) => {
        throw err
    })
}
