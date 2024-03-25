import axios from "axios";

export default class AbilityService{

    getAllAbility(){
        return axios.get(`http://localhost:8080/api/abilities/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/abilities/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/abilities/getByJobSeekerId?jobSeekerId=${jobSeekerId}`);
    }

    addAbility(ability){
        return axios.post(`http://localhost:8080/api/abilities/add`,ability);
    }

    updateAbility(ability){
        return axios.put(`http://localhost:8080/api/abilities/update`, ability);
    }

    deleteAbility(id){
        return axios.delete(`http://localhost:8080/api/abilities/delete?id=${id}`);
    }
}