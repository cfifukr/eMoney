import api from "../api/axios"

export const isJwtToken = () =>{
    const token = localStorage.getItem("jwtToken");

    return token ? true : false;
}


export const getJwtToken = () =>{
    const token = localStorage.getItem("jwtToken");

    return token;

}

export const addJwtToken = (jwtToken) =>{
    localStorage.setItem("jwtToken");
}


export const deleteJwtToken = () =>{
    localStorage.removeItem("jwtToken");

}


export const getConfig = () =>{
    const tokenJwt = getJwtToken();

    const configHeaders = {
    headers: {
        'Authorization': `Bearer ${tokenJwt}`
    }
    }

    return configHeaders;
};


export const getUserFromToken = async(config) =>{


    const response =  await api.get("api/v1/user", config);

    if(response?.data?.username){
        const user = response.data;
        return user;
    }
   
    return {error: "Relogin to use our service"};
};
