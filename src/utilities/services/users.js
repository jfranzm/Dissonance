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


export function getUser() {
    const token = getToken();
    return token ?
      JSON.parse(atob(token.split('.')[1])).user
      :
      null;
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


