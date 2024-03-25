import axios from "axios";

export default class EducationService{

    getAllEducation(){
        return axios.get(`http://localhost:8080/api/educations/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/educations/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/educations/getAllBySortedGraduationDate?jobSeekerId=${jobSeekerId}`);
    }

    addEducation(education){
        return axios.post(`http://localhost:8080/api/educations/add`,education);
    }

    updateEducation(education){
        return axios.put(`http://localhost:8080/api/educations/update`, education);
    }

    deleteEducation(id){
        return axios.delete(`http://localhost:8080/api/educations/delete?id=${id}`);
    }
}