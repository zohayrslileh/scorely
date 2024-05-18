import Authorization from "@/Models/Authorization"
import axios, { AxiosRequestConfig } from "axios"
import config from "@/config"

/*
|-----------------------------
|  Create instance
|-----------------------------
|
|
*/
export const createInstance = () => axios.create({
    baseURL: (import.meta.env.DEV ? config.DEV_BASE_SERVER_URL : "/") + "api",
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