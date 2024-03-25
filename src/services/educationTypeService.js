import axios from "axios";

export default class EducationType{

    getAllEducationType(){
        return axios.get(`http://localhost:8080/api/educationTypes/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/educationTypes/getById?id=${id}`);
    }

    addEducationType(educationType){
        return axios.post(`http://localhost:8080/api/educationTypes/add`,educationType);
    }

    updateEducationType(educationType){
        return axios.put(`http://localhost:8080/api/educationTypes/update`, educationType);
    }

    deleteEducationType(id){
        return axios.delete(`http://localhost:8080/api/educationTypes/delete?id=${id}`);
    }
}