import axios from "axios";

export default class JobService{

    getAllJob(){
        return axios.get(`http://localhost:8080/api/jobs/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobs/getById?id=${id}`);
    }

    getByJobNameWithSector(jobName){
        return axios.get(`http://localhost:8080/api/jobs/getByJobNameAndSectorId?jobName=${jobName}`);
    }

    getBySectorId(sectorId){
        return axios.get(`http://localhost:8080/api/jobs/getBySector?sectorId=${sectorId}`);
    }

    addJob(job){
        return axios.post(`http://localhost:8080/api/jobs/add`,job);
    }

    updateJob(job){
        return axios.put(`http://localhost:8080/api/jobs/update`, job);
    }

    deleteJob(id){
        return axios.delete(`http://localhost:8080/api/jobs/delete?id=${id}`);
    }
}