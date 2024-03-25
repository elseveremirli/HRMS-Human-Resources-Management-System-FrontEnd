import axios from "axios";

export default class ProgramInfoService{

    getAllProgramInfo(){
        return axios.get(`http://localhost:8080/api/programInfos/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/programInfos/getById?id=${id}`);
    }

    addProgramInfo(program){
        return axios.post(`http://localhost:8080/api/programInfos/add`,program);
    }

    updateProgramInfo(program){
        return axios.put(`http://localhost:8080/api/programInfos/update`, program);
    }

    deleteProgramInfo(id){
        return axios.delete(`http://localhost:8080/api/programInfos/delete?id=${id}`);
    }
}