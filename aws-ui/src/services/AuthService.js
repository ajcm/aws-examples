import axios from "axios";

var http = "http://localhost:8080"


export const doSignIn = async (loginRequest) => {
    const  response = await axios.post(
        http + "/api/auth/signin",
        loginRequest,
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
        }
    )
  
    return response;
}


export const doSignUp = async (signUpRequest) => {
  const  response = await axios.post(
      http + "/api/auth/signup",
      signUpRequest,
      {
          headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
      }
  )

  return response.data
}





export const getIdentity = async (token) => {
    let tokenHeader =  token ? token : sessionStorage.getItem('JWT_TOKEN')

    const  response = await axios.get(
        http + "/api/auth/identity",
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + tokenHeader,
              },
        }
    )
  
    return response.data
}

