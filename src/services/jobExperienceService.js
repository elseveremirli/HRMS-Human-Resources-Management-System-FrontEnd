import axios from "axios";

export default class JobExperienceService{

    getAllJobExperience(){
        return axios.get(`http://localhost:8080/api/jobExperiences/getAllJobExperienceDetail`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobExperiences/getByExperienceId?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/jobExperiences/getAllBySortedEndDate?jobSeekerId=${jobSeekerId}`);
    }

    addJobExperience(jobExperience){
        return axios.post(`http://localhost:8080/api/jobExperiences/add`,jobExperience);
    }

    updateJobExperience(jobExperience){
        return axios.put(`http://localhost:8080/api/jobExperiences/update`, jobExperience);
    }

    deleteJobExperience(id){
        return axios.delete(`http://localhost:8080/api/jobExperiences/delete?id=${id}`);
    }

}