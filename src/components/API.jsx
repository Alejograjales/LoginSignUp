import axios from 'axios';
import { useEffect } from 'react';

const API = () => {
    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
    });

    useEffect(() => {
        getUsuario();
    }, [])

    async function getUsuario() {
        const csrf = await http.get('/sanctum/csrf-cookie')
        console.log('csrf =', csrf)
    }

    return (
        http
    )
}

export default API