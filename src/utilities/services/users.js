import * as usersAPI from '../api/users'


// retreive jwt from the person's browser
export function getToken() {
    const token = window.localStorage.getItem('token');

    if (!token) return null;

    const payload = JSON.parse(window.atob(token.split('.')[1]))

    if (payload.exp < Date.now() / 1000) {
        // troken expired
        window.localStorage.removeItem('token')
        return null
    }

    return token;
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr));
}
// Convert the token payload to a js obj OR retun null when no token
export function getUser() {
    const token = getToken();
    if (!token) return null
    return JSON.parse(window.atob(token.split('.')[1])).user
}

// SETS THE TOKEN IN LOCAL STORE FOR US
export async function signUp(formData){
    const token = await usersAPI.signUp(formData)
    window.localStorage.setItem('token', token)
    return getUser()
}


export async function login(formData) {
    const token = await usersAPI.login(formData)
    window.localStorage.setItem('token', token)
    return getUser()
}

export function logOut(){
    window.localStorage.removeItem('token')
}


