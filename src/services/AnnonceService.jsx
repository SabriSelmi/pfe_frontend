import http from "./axioscontext";

const Create=(data)=>{
    return http.post("/annonce",data)
}
const GetAll=()=>{
    return http.get("/annonce")
}
const Update=(id,data)=>{
    return http.put(`/annonce/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/annonce/${id}`)
}
const getRecentAnnonces=(limit)=>{
    return http.get(`/annonce/recent/${limit}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/annonce/${id}`)
}
const checkFavoris=(id)=>{
    return http.put(`/annonce/${id}/check`)
}


export default{
    Create, GetAll, Update, GetById, DeleteOne, checkFavoris, getRecentAnnonces,
}