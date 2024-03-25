import axios from "axios";

export default class FacultyService{

     getAllFaculty(){
        return axios.get(`http://localhost:8080/api/faculties/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/faculties/getById?id=${id}`);
    }

    addFaculty(faculty){
        return axios.post(`http://localhost:8080/api/faculties/add`,faculty);
    }

    updateFaculty(faculty){
        return axios.put(`http://localhost:8080/api/faculties/update`, faculty);
    }

    deleteFaculty(id){
        return axios.delete(`http://localhost:8080/api/faculties/delete?id=${id}`);
    }
}