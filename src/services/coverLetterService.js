import axios from "axios";

export default class CoverLetterService{

    getAllCoverLetter(){
        return axios.get(`http://localhost:8080/api/coverLetters/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/coverLetters/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/coverLetters/getByJobSeekerId?jobSeekerId=${jobSeekerId}`);
    }

    addCoverLetter(coverLetter){
        return axios.post(`http://localhost:8080/api/coverLetters/add`,coverLetter);
    }

    updatCoverLetter(coverLetter){
        return axios.put(`http://localhost:8080/api/coverLetters/update`, coverLetter);
    }

    deleteCoverLetter(id){
        return axios.delete(`http://localhost:8080/api/coverLetters/delete?id=${id}`);
    }
}