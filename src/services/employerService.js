import axios from "axios";

export default class EmployerService{

    getAllEmployer(){
        return axios.get(`http://localhost:8080/api/employers/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/employers/getById?id=${id}`);
    }

    getByIsActive(){
        return axios.get(`http://localhost:8080/api/employers/getByIsActive?isActive=true`);
    }

    getByIsPassive(){
        return axios.get(`http://localhost:8080/api/employers/getByIsActive?isActive=false`);
    }

    addEmployer(employer){
        return axios.post(`http://localhost:8080/api/employers`,employer);
    }

    updateEmployer(employer){
        return axios.put(`http://localhost:8080/api/employers/update`, employer);
    }

    deleteEmployer(id){
        return axios.delete(`http://localhost:8080/api/employers/delete?id=${id}`);
    }

     makeActiveOrPassive(id,isActive){
        return axios.put(`http://localhost:8080/api/employers/makeActiveOrPassive?isActive=${isActive}&id=${id}`);
    }
}