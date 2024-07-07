import io from 'socket.io-client';


export const api = process.env.REACT_APP_SERVER
export const socketApi = process.env.REACT_APP_SOCKET

export const socket = io(socketApi);
