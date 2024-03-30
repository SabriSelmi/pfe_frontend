import http from "./axioscontext";

const sendMessage=(id, message)=>{
    return http.post(`/chat/${id}/newMessage`, { text: message })
}

export default{
    sendMessage,
}