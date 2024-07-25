
import axios from "axios";

var httpUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : "http://localhost:8080"

export const getBackendUrl = () => (httpUrl)

export const listObjects = async (bucket, prefix, delimiter) => {

    const request = {
        bucket: bucket,
        prefix: prefix,
        delimiter: delimiter,
    };


    const response = await post( "/s3/listObjectDetails",
        request)

    return response
}



export const get = async (url, request) => {
    const response = await axios.get(
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



export const post = async (url, request) => {
    const response = await axios.post(
        httpUrl +  url,
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

