import axios from "axios";

export default class PositionLevelService{

    getAllPositionLevel(){
        return axios.get(`http://localhost:8080/api/positionLevels/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/positionLevels/getById?id=${id}`);
    }

    addPositionLevel(positionLevel){
        return axios.post(`http://localhost:8080/api/positionLevels/add`,positionLevel);
    }

    updatePositionLevel(positionLevel){
        return axios.put(`http://localhost:8080/api/positionLevels/update`, positionLevel);
    }

    deletePositionLevel(id){
        return axios.delete(`http://localhost:8080/api/positionLevels/delete?id=${id}`);
    }
}