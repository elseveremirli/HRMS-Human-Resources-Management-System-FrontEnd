import axios from "axios";

export default class WorkTypeService{

     getAllWorkType(){
        return axios.get(`http://localhost:8080/api/workTypes/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/workTypes/getById?id=${id}`);
    }

    addWorkType(workType){
        return axios.post(`http://localhost:8080/api/workTypes/add`,workType);
    }

    updateWorkType(workType){
        return axios.put(`http://localhost:8080/api/workTypes/update`, workType);
    }

    deleteWorkType(id){
        return axios.delete(`http://localhost:8080/api/workTypes/delete?id=${id}`);
    }
}