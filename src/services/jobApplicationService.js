import axios from "axios";

export default class JobApplicationService{

    getAllJobApplications(){
        return axios.get(`http://localhost:8080/api/jobApplications/getAll`)
    }

    getByIdJobApplication(id){
        return axios.get(`http://localhost:8080/api/jobApplications/getByIdJobApplication?id=${id}`)
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/jobApplications/getByJobSeekerId?jobSeekerId=${jobSeekerId}`)
    }

    getByEmployerId(employerId){
        return axios.get(`http://localhost:8080/api/jobApplications/getByEmployerId?employerId=${employerId}`)
    }

    addJobApplication(jobApplication){
        return axios.post(`http://localhost:8080/api/jobApplications/add`, jobApplication)
    }

    deleteJobApplication(id){
        return axios.delete(`http://localhost:8080/api/jobApplications/delete?id=${id}`)
    }
}