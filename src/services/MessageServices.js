import http from "./axioscontext";

const Create = (data) => {
    return http.post("/messages", data)
}
const GetAll = (id) => {
    return http.get(`/messages/${id}`)
}
const Update = (id, data) => {
    return http.put(`/messages/${id}`, data)
}
const GetById = (id) => {
    return http.get(`/messages/${id}`)
}

const GetConversation = (sender, reciever) => {
    return http.get(`/messages/${sender}/${reciever}`)
}


export default {
    Create, GetAll, Update, GetById, GetConversation
}