import axios from 'axios';
import { BASE_URL } from './apiURL';

class Http {
    constructor(){
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000
        })
    }
}

const http = new Http().instance;
export default http;