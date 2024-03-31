import io from 'socket.io-client';


export const api = "http://localhost:3001"
export const socketApi = "http://localhost:8001"

export const socket = io(socketApi);
