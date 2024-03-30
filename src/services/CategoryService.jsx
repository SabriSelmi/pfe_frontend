import http from "./axioscontext";

const Create=(data)=>{
    return http.post("/categorie",data)
}
const GetAll=()=>{
    return http.get("/categorie")
}
const Update=(id,data)=>{
    return http.put(`/categorie/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/categorie/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/categorie/${id}`)
}

export default{
    Create, GetAll, Update, GetById, DeleteOne,
}