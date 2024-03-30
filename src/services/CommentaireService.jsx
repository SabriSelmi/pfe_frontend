import http from "./axioscontext";

const Create=(data)=>{
    return http.post("/commentaire",data)
}
const GetAll=()=>{
    return http.get("/commentaire")
}
const Update=(id,data)=>{
    return http.put(`/commentaire/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/commentaire/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/commentaire/${id}`)
}


export default{
    Create, GetAll, Update, GetById, DeleteOne,
}