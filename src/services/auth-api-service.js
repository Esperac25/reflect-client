import config from '../config';

const AuthAPIService = {
    async postUser(user){
        const res = await fetch(`${config.API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user),
        });
        return await (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json());
    },
    loginUser(user){
        return fetch(`${config.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(user),
        }).then((res) => !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
    },
}

export default AuthAPIService;