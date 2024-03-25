import axios from "axios"

export default class SectorService{
    getSectors(){
        return axios.get("http://localhost:8080/api/sectors/getAll");
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/sectors/getById?id=${id}`);
    }

    addSector(sector){
        return axios.post("http://localhost:8080/api/sectors/add",sector);
    }

    deleteSector(id){
        return axios.delete(`http://localhost:8080/api/sectors/deleteById?id=${id}`)
    }

    updateSector(sector){
        return axios.put(`http://localhost:8080/api/sectors/update`, sector)
    }

}