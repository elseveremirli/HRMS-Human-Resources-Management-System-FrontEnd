import axios from "axios";

export default class ExperienceService{

     getAllExperience(){
        return axios.get(`http://localhost:8080/api/experiences/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/experiences/getById?id=${id}`);
    }

    addExperience(experience){
        return axios.post(`http://localhost:8080/api/experiences/add`,experience);
    }

    updateExperience(experience){
        return axios.put(`http://localhost:8080/api/experiences/update`, experience);
    }

    deleteExperience(id){
        return axios.delete(`http://localhost:8080/api/experiences/delete?id=${id}`);
    }
}