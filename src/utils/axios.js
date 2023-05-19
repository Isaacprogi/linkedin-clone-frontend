import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typeicode.com/cors-anywhere/'
})

export const getPostPage = async(pageParam = 1, options = {}) => {
    const {data} = await api.get(`posts?_page=${pageParam}`, options)
    return data
}