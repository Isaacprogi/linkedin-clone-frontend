import io from 'socket.io-client'
export const ENDPOINT = 'https://linkedin-clone-api.onrender.com'

export const socket = io(ENDPOINT)
