import axios from "axios";


export const get = async (httpUrl) => {
    const  response = await axios.get(
        httpUrl,       
        {
            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}


export const post = async (httpUrl,request) => {
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

