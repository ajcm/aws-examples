
import axios from "axios";

var httpUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : "http://localhost:8080/" 


export const getUsers = async (page  = 0) => {
    const  response = await axios.get(
      httpUrl + "api/admin/users",

        {
            params: { page: page }, 

            headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            }
        }
    )
     

    return response.data
}

