const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

const setToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token.access_token)
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token)
}

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
}

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN)
}

const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN)
}

const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN)
}

export {setToken, getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken}