import { GET_ALL_DRIVERS,
         GET_DRIVERS_BY_NAME,
         DETAIL_BY_ID,
         CLEAR_DETAIL,
         ORDER_BY,
         FILTER_BY_TEAMS,
         FILTER_BY_ORIGIN,
         TEAM_LIST,
         NEW_DRIVER,
 } from "./actions_types";
import axios from 'axios'

const URL='http://localhost:3001/driver/'
const URL_TEAMS= 'http://localhost:3001/team'


export const getAllDrivers=()=> async dispatch => {
    try {
        const {data}= await axios.get(URL);
        dispatch({
            type:GET_ALL_DRIVERS,
            payload:data
        });
    } catch (error) {
        throw new Error(error.message)
    }
} 
export const getDriversByName= (name)=> async dispatch=>{
    try {
        const {data} = await axios.get(`${URL}?name=${name}`)
        dispatch({
            type:GET_DRIVERS_BY_NAME,
            payload: data
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getDetailById= (id) => async dispatch =>{
    try {
        const {data}= await axios.get(`${URL}${id}`)
        dispatch({
            type:DETAIL_BY_ID,
            payload:data
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
export const clearDetail= ()=> {
    return({
    type:CLEAR_DETAIL,
    payload:[]
})}

export const getTeamList = () =>async dispatch=>{
 try {
    const {data}=await axios.get(URL_TEAMS)
    dispatch({
        type:TEAM_LIST,
        payload: data
    })
 } catch (error) {
    throw new Error(error.message)
 }}

export const filterbyTeam= (teamName)=> {
    return({
        type:FILTER_BY_TEAMS,
        payload:teamName
    })
}
export const filterByOrigin = (origin) =>{
    return({
        type:FILTER_BY_ORIGIN,
        payload:origin
    })
}
export const orderBy=(order)=>{
    return({
        type:ORDER_BY,
        payload:order
    })
}
export const postNewDriver=(form)=> async dispatch => {
    try {
        await axios.post(URL, form);
        dispatch({
            type:NEW_DRIVER,
            payload:form
        });
    } catch (error) {
        throw new Error(error.message)
    }
} 
