import axios from "axios";

export default class SystemEmployeeService{

    getAllSystemEmployee(){
        return axios.get(`http://localhost:8080/api/systemEmployees/getAll`);
    }

    getBySystemEmployeeId(id){
        return axios.get(`http://localhost:8080/api/systemEmployees/getById?id=${id}`);
    }

    makeActiveOrPassive(id,isActive){
        return axios.put(`http://localhost:8080/api/systemEmployees/makeActiveOrPassive?isActive=${isActive}&id=${id}`);
    }

    addSystemEmployee(systemEmployee){
        return axios.post(`http://localhost:8080/api/systemEmployees/add`, systemEmployee);
    }

    deleteSystemEmployee(id){
        return axios.delete(`http://localhost:8080/api/systemEmployees/{id}?id=${id}`);
    }

    updateSystemEmployee(systemEmployee){
        return axios.put(`http://localhost:8080/api/systemEmployees/update`,systemEmployee);
    }
}