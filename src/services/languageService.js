import axios from "axios";

export default class LanguageService{

    getAllLanguage(){
        return axios.get(`http://localhost:8080/api/languages/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/languages/getById?id=${id}`);
    }

    addLanguage(language){
        return axios.post(`http://localhost:8080/api/languages/add`,language);
    }

    updateLanguage(language){
        return axios.put(`http://localhost:8080/api/languages/update`, language);
    }

    deleteLanguage(id){
        return axios.delete(`http://localhost:8080/api/languages/delete/{id}?id=${id}`);
    }
}