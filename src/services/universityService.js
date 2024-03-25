import axios from "axios";

export default class UniversityService{

    getUniversity(){
        return axios.get(`http://localhost:8080/api/universities/getAll`);
    }

    getByUniversityId(universityId){
        return axios.get(`http://localhost:8080/api/universities/getById?id=${universityId}`);
    }

    addUniversity(university){
        return axios.post(`http://localhost:8080/api/universities/add`,university);
    }

    deleteUniversity(id){
        return axios.delete(`http://localhost:8080/api/universities/delete/{id}?id=${id}`);
    }

    updateAdvertise(university) {
        return axios.put(`http://localhost:8080/api/universities/update`,university);
    }
}