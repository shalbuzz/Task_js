import { BASE_URL } from "./constant.js";

const getAllData = async(endpoint)=>{
 try {
    const response = await axios(`${BASE_URL}/${endpoint}`)
    return response.data
 } catch (error) {
    console.log(error);
    
 }

}

const getDataById = async(endpoint,id)=>{
    try {
        const response = await axios(`${BASE_URL}/${endpoint}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

const deleteData = async (endpoint, id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
        return response.status === 200;  
    } catch (error) {
        console.log("Delete error:", error);
        return false; 
    }
};

const addNewData = async(endpoint,payload)=>{
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`,payload)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

const editData = async(endpoint,id,payload)=>{
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`,payload)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export {
    getAllData,
    getDataById,
    deleteData,
    addNewData,
    editData
}