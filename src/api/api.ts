import { AxiosResponse, default as axios } from 'axios';

const PORT = 5000
const BASE_URL = `http://localhost:${PORT}/api/task`

const get = async (path: string, params: {}, headers = {}): Promise<any> => {
    try {
        const res: AxiosResponse = await axios.get(`${BASE_URL}${path}`, { params: params, headers: headers });
        return res.data;
    } catch (e: any) {
        return { error: e.message }
    }
}

const post = async (path: string, body: {}, headers: {} = {}): Promise<any> => {
    try {
        const res: AxiosResponse = await axios.post(`${BASE_URL}${path}`, body, { headers: headers });
        return res.data;
    } catch (e: any) {
        return { error: e.message }
    }
}

const patch = async (path: string, body: {}, headers: {} = {}): Promise<any> => {
    try {
        const res: AxiosResponse = await axios.patch(`${BASE_URL}${path}`, body, { headers: headers });
        return res.data;
    } catch (e: any) {
        return { error: e.message }
    }
}

const del = async (path: string, payload: {}, headers = {}): Promise<any> => {
    try {
        const res: AxiosResponse = await axios.delete(`${BASE_URL}${path}`, { data: payload, headers: headers });
        return res.data;
    } catch (e: any) {
        return { error: e.message }
    }
}


export const API = {
    get,
    post,
    patch,
    del
}