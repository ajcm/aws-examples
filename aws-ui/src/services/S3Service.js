
import axios from "axios";

var httpUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : "http://localhost:8080" 


export const getBackendUrl =  () => (httpUrl)

export const get = async (url,request) => {
    const  response = await axios.get(
        httpUrl + url,
        request,
        {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}



export const post = async (url,request) => {
    const  response = await axios.post(
        httpUrl + url,
        request,
        {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}



export const getEcho = async (request) => {
    const  response = await axios.post(
        httpUrl,
        request,
        {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}



export const getUserId = async (request) => {
    const  response = await axios.post(
        httpUrl,
        request,
        {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}
