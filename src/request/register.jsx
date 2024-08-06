import * as axios from 'axios'

const client = axios.default;

const base = "ws://127.0.0.1:7001/api/register";

export async function getTitle() {
    const result = await client.get(base);
    return result.data;
}