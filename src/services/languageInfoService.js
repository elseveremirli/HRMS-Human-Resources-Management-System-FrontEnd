import axios from "axios";

export default class LanguageInfoService{

    getAllLanguageInfo(){
        return axios.get(`http://localhost:8080/api/languageInfos/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/languageInfos/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/languageInfos/getByJobSeekerId?id=${jobSeekerId}`);
    }

    addLanguage(languageInfo){
        return axios.post(`http://localhost:8080/api/languageInfos/add`,languageInfo);
    }

    updateLanguageInfo(languageInfo){
        return axios.put(`http://localhost:8080/api/languageInfos/update`, languageInfo);
    }

    deleteLanguageInfo(id){
        return axios.delete(`http://localhost:8080/api/languageInfos/delete/{id}?id=${id}`);
    }
}