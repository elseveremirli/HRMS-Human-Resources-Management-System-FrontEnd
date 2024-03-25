import axios from "axios";

export default class HighSchoolService{

    getAllHighSchoolInfo(){
        return axios.get(`http://localhost:8080/api/highSchools/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/highSchools/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/highSchools/getByJobSeekerId?jobSeekerId=${jobSeekerId}`);
    }

    addHighSchoolInfo(highSchoolInfo){
        return axios.post(`http://localhost:8080/api/highSchools/add`,highSchoolInfo);
    }

    updateHighSchoolInfo(highSchoolInfo){
        return axios.put(`http://localhost:8080/api/highSchools/update`, highSchoolInfo);
    }

    deleteHighSchoolInfo(id){
        return axios.delete(`http://localhost:8080/api/highSchools/delete?id=${id}`);
    }
}