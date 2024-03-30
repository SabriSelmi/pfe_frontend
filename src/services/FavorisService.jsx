import http from "./axioscontext";

const Create=(data)=>{
    return http.post("/favoris",data)
}
const GetAll=()=>{
    return http.get("/favoris")
}
const Update=(id,data)=>{
    return http.put(`/favoris/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/favoris/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/favoris/${id}`)
}
const GetFavorisByUser=(id)=>{
    return http.get(`/favoris/user/${id}`)
}
const checkIfFavorited=(userId, annonceId)=>{
    return http.get(`/favoris/${userId}/${annonceId}`)
}

export default{
    Create, GetAll, Update, GetById, DeleteOne, GetFavorisByUser, checkIfFavorited,
}