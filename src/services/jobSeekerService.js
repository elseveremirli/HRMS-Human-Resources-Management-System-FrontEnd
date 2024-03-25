import axios from "axios";

export default class JobSeekerService{

    getAllJobSeeker(){
        return axios.get(`http://localhost:8080/api/jobSeekers/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobSeekers/getById?id=${id}`);
    }

    getByNationalityId(nationalityId){
        return axios.get(`http://localhost:8080/api/jobSeekers/getByNationalityId?nationalIdentity=${nationalityId}`);
    }

    addJobSeeker(jobSeeker){
        return axios.post(`http://localhost:8080/api/jobSeekers/add`,jobSeeker);
    }

    updateJobSeeker(jobSeeker){
        return axios.put(`http://localhost:8080/api/jobSeekers/update`, jobSeeker);
    }

    deleteJobSeeker(id){
        return axios.delete(`http://localhost:8080/api/jobSeekers/delete?id=${id}`);
    }

     makeActiveOrPassive(id,isActive){
        return axios.put(`http://localhost:8080/api/jobSeekers/makeActiveOrPassive?isActive=${isActive}&id=${id}`);
    }
}