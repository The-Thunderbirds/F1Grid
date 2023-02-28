import axios from 'axios';
import { FLOWNS_URL_ENDPOINT } from "@/constants";

export const getAddrByName = async (name: string) => {
    try{
        const endpoint = `/domain/${name}`
        const result = await axios.get(`${FLOWNS_URL_ENDPOINT}${endpoint}`);
        return result.data;
    } catch(error){
        console.log(error);
        return null;
    }
}

export const getNameByAddr = async (addr: string) => {
    try{
        const endpoint = `/address/${addr}`
        const result = await axios.get(`${FLOWNS_URL_ENDPOINT}${endpoint}`);
        return result.data;
    } catch(error){
        console.log(error);
        return null;
    }
}