import axios from "axios";

export default class FavoriteJobAdvertisementService{

    getAllFavoriteJobadverisements(){
        return axios.get(`http://localhost:8080/api/favoriteJobAdvertisements/getAll`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/favoriteJobAdvertisements/getById?id=${id}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/favoriteJobAdvertisements/getByJobSeekerId?jobSeekerId=${jobSeekerId}`);
    }

    addFavoriteJobAdvertisement(jobAdvertisement){
        return axios.post(`http://localhost:8080/api/favoriteJobAdvertisements/add`,jobAdvertisement);
    }

    deleteFavoriteJobAdvetisement(id){
        return axios.delete(`http://localhost:8080/api/favoriteJobAdvertisements/delete?id=${id}`);
    }
}