import axios from "axios";

export default class CityService{

     getAllCity(){
        return axios.get(`http://localhost:8080/api/cities/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/cities/getById?id=${id}`);
    }

    addCity(city){
        return axios.post(`http://localhost:8080/api/cities/add`,city);
    }

    updateCity(city){
        return axios.put(`http://localhost:8080/api/cities/update`, city);
    }

    deleteCity(id){
        return axios.delete(`http://localhost:8080/api/cities/delete?id=${id}`);
    }
}