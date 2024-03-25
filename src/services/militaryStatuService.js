import axios from "axios";

export default class MilitaryStatuService{

     getAllMilitaryStatu(){
        return axios.get(`http://localhost:8080/api/militaryStatus/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/militaryStatus/getById?id=${id}`);
    }

    addMilitaryStatu(militaryStatu){
        return axios.post(`http://localhost:8080/api/militaryStatus/add`,militaryStatu);
    }

    updateMilitaryStatu(militaryStatu){
        return axios.put(`http://localhost:8080/api/militaryStatus/update`, militaryStatu);
    }

    deleteMilitaryStatu(id){
        return axios.delete(`http://localhost:8080/api/militaryStatus/delete?id=${id}`);
    }
}