import io from 'socket.io-client'
export const ENDPOINT = 'http://localhost:4000'

export const socket = io(ENDPOINT)
