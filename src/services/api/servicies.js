import axios from 'axios';

let userEmp = 3

const api = axios.create({
    baseURL: "https://70cd1uugng.execute-api.us-east-1.amazonaws.com/dev/"
});

// Fetch Organization
export const fetchOrgAsignation = async () => {
    const res = await api.get('requirement/organization')
    // const res = await api.get('https://rtjha24l80.execute-api.us-east-2.amazonaws.com/default/gh-proy-req-requirement-get-org-assign-test')
    return res.data
}

// Fetch Position
export const fetchPosition = async () => {
    const res = await api.get('requirement/position')
    // const res = await api.get('https://7xb7zc4a8l.execute-api.us-east-2.amazonaws.com/default/gh-proy-req-requirement-get-position-test')
    return res.data
}

// Fetch Person
export const fetchPerson = async () => {
    const res = await api.get('requirement/person')
    return res.data
}

// Fetch Requirement Request Employee
export const fetchRequest= async () => {
    const res = await api.get('requirement/request/'+userEmp)
    return res.data
}

// Fetch Requirement Request Employee
export const fetchListRequest= async () => {
    const res = await api.get('requirement/request')
    return res.data
}


// Save Requirement Request Employee
export const sendRequest= async (data) => {
    const res = await api.post('requirement/request',data)
    return res.data
}

// Save Requirement Request Approver
export const sendRequestApprover= async (data) => {
    const res = await api.post('requirement/request/approver',data)
    return res.data
}

// Save Requirement Request Rejecter
export const sendRequestReject= async (data) => {
    const res = await api.post('requirement/request/reject',data)
    return res.data
}

// Save Requirement Request Observer
export const sendRequestObserve= async (data) => {
    const res = await api.post('requirement/request/observe',data)
    return res.data
}

// Fetch DataGraph1
export const fetchDataGraph1 = async () => {
    const res = await api.get('graph/request1')
    return res.data
}

// Fetch DataGraph3
export const fetchDataGraph3 = async () => {
    const res = await api.get('graph/request3')
    return res.data
}

// Fetch DataGraph4
export const fetchDataGraph4 = async () => {
    const res = await api.get('graph/request4')
    return res.data
}

// Fetch Societies
export const fetchSocieties = async () => {
    const res = await api.get('settings/societies')
    // const res = await api.get('https://7xb7zc4a8l.execute-api.us-east-2.amazonaws.com/default/gh-proy-req-config-get-society-test')
    return res.data
}

// Save new Config Societies
export const sendSocieties = async (data) => {
    const res = await api.post('settings/societies',data)
    // const res = await api.post('https://dfi9frerlj.execute-api.us-east-2.amazonaws.com/default/gh-proy-req-config-post-society-test',data)
    return res.data
}

// Fetch Organizational Units
export const fetchOrganizationalUnits = async () => {
    const res = await api.get('requirement/orgUnit')
    return res.data
}

// Fetch Type States
export const fetchTypeState = async () => {
    const res = await api.get('requirement/typeState')
    return res.data
}

// Fetch Type Requirements
export const fetchTypeRequirements = async () => {
    const res = await api.get('requirement/typeRequest')
    return res.data
}
 