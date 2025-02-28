import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
        'Origin': process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios
