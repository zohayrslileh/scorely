import Authorization from "@/Models/Authorization"
import axios, { AxiosRequestConfig } from "axios"
import Server from "."

/*
|-----------------------------
|  Create instance
|-----------------------------
|
|
*/
export const createInstance = () => axios.create({
    baseURL: Server.value + "api",
    timeout: 30000,
    headers: {
        "Authorization": Authorization.value
    }
})

/**
 * Request method
 * 
 * @returns 
 */
export default async function request<Body>(requestConfig: AxiosRequestConfig) {

    // Instance
    const instance = createInstance()

    // Ask response
    const response = await instance<Body>(requestConfig)

    return response.data
}