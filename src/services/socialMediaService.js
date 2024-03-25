import axios from "axios";

export default class SocialMediaService{

    getAllSocialMedia(){
        return axios.get(`http://localhost:8080/api/socialMedias/getAll`);
    }

    getById(socialMediaId){
        return axios.get(`http://localhost:8080/api/socialMedias/getById?id=${socialMediaId}`);
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/socialMedias/getByJobSeekerId?jobSeeker=${jobSeekerId}`);
    }

    addSocialMedia(socialMedia){
        return axios.post(`http://localhost:8080/api/socialMedias/add`, socialMedia);
    }

    updateSocialMedia(socialMedia){
        return axios.put(`http://localhost:8080/api/socialMedias/update`,socialMedia);
    }

    deleteSocialMedia(id){
        return axios.delete(`http://localhost:8080/api/socialMedias/delete?id=${id}`);
    }


}