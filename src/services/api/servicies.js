import axios from 'axios';

const api = axios.create({
    baseURL: "https://70cd1uugng.execute-api.us-east-1.amazonaws.com/dev/"
});

// Fetch Organization
export const fetchOrgAsignation = async () => {
    const res = await api.get('requirement/organization')
    return res.data
}

// Fetch Position
export const fetchPosition = async () => {
    const res = await api.get('requirement/position')
    return res.data
}

// Fetch Person
export const fetchPerson = async () => {
    const res = await api.get('requirement/person')
    return res.data
}

// Fetch Requirement Request Employee
export const fetchRequest= async () => {
    const res = await api.get('requirement/request')
    return res.data
}

// Fetch DataGraph
export const fetchDataGraph = async () => {
    const res = await api.get('graph/request')
    return res.data
}

// Fetch Societies
export const fetchSocieties = async () => {
    const res = await api.get('https://7xb7zc4a8l.execute-api.us-east-2.amazonaws.com/default/gh-proy-req-config-get-society-test')
    return res.data
}

// Save new Config Societies
export const sendSocieties = async (data) => {
    const res = await api.post('settings/societies',data)
    return res.data
}
 