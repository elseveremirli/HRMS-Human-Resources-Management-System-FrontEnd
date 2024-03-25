import axios from "axios";

export default class HighSchoolTypeService{

    getAllHighSchoolType(){
        return axios.get(`http://localhost:8080/api/highSchoolTypes/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/highSchoolTypes/getById?id=${id}`);
    }

    addHighSchoolType(highSchoolType){
        return axios.post(`http://localhost:8080/api/highSchoolTypes/add`,highSchoolType);
    }

    updateHighSchoolType(highSchoolType){
        return axios.put(`http://localhost:8080/api/highSchoolTypes/update`, highSchoolType);
    }

    deleteHighSchoolType(id){
        return axios.delete(`http://localhost:8080/api/highSchoolTypes/delete?id=${id}`);
    }
}