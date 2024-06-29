import http from "./axioscontext";

const sendResetPasswordEmail=(data)=>{
    return http.post("/utilisateur/email",data)
}

const verificationCode=(data)=>{
    return http.post("/utilisateur/verification-code",data)
}

const resetPassword=(data)=>{
    return http.post("/utilisateur/reset-password",data)
}


export default{
    sendResetPasswordEmail, verificationCode, resetPassword
}