/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */

import { GET_ALL_DRIVERS,
         GET_DRIVERS_BY_NAME,
        DETAIL_BY_ID,
        CLEAR_DETAIL,
        TEAM_LIST,
        FILTER_BY_TEAMS,
        FILTER_BY_ORIGIN,
        ORDER_BY,
     } from "./actions_types";

let initialState={ allDrivers:[], 
                   byDetail:[],
                   allDriversCopy: [],
                   filteredByTeams:[],
                   filteredByOrigin:[],
                   teamList:[],
                   noInfo:"",
                 };

const reducer = ( state= initialState, action)=>{
    switch(action.type){
    case GET_ALL_DRIVERS:
    return{
     ...state,
     allDrivers:action.payload,
     allDriversCopy:action.payload,

        }
    case GET_DRIVERS_BY_NAME:
        return{
            ...state,
            allDrivers:action.payload.length > 0 ? action.payload : [],
            filteredByTeams: action.payload,
            filteredByOrigin:action.payload,
            results: action.payload.length > 0 ?`${action.payload.length} results for "${action.searchingName}"` : "",
            noInfo: action.payload.length === 0 ? "no drivers coincidence" : ""
        }
    case DETAIL_BY_ID:
        return {
            ...state,
            byDetail:action.payload
        }
    case CLEAR_DETAIL:
        return{
            ...state,
            byDetail:action.payload
        }
    case TEAM_LIST:
        return{
            ...state,
            teamList:action.payload
        }   
    case FILTER_BY_TEAMS:
        const teamName= action.payload;
        if(teamName ==="") return {
            ...state,
            filteredByTeams:state.allDriversCopy,
        } 
        else{
            const filteredTeams =  state.allDriversCopy.filter(driver => {
                const teams = driver.teams?.split(',').map(team => team.trim().toLowerCase());
                const lowercaseTeamName = teamName.toLowerCase();              
                return teams?.includes(lowercaseTeamName);
              });
              
            return {
            ...state,
            filteredByTeams:filteredTeams,
            noInfo: filteredTeams.length === 0 ? "No Drivers found with this temperament" : ""
          }
        }
    case FILTER_BY_ORIGIN:
        const origin=action.payload
    if(origin ==="" ){ 
        return {
        ...state,
        filteredByOrigin:state.filteredByTeams,

        
         } 
    }else if(origin==="Created"){
        const originbyDb= state.filteredByTeams?.filter(driver => driver.origin ==="Created");
        console.log("Created",originbyDb)
        return{
            ...state,
        filteredByOrigin: originbyDb,
        noInfo: originbyDb.length===0 ? "No created drivers were found" : ""
        }
    } else {
    const originByApi= state.filteredByTeams?.filter(driver=> driver.origin === "Api" )
    return {
        ...state,
        filteredByOrigin: originByApi,
        noInfo: originByApi.length ===0 ? "No Api drivers were found" : "" 
    }}

    case ORDER_BY:
        let driversToOrder = state.filteredByOrigin.length < state.filteredByTeams.length ? state.filteredByOrigin : state.filteredByTeams.length >0 && state.filteredByTeams < state.allDrivers.length ? state.filteredByTeams : state.allDrivers;

        if(action.payload === 'az'){
            const orderAZ=[...driversToOrder].sort((a,b)=>{
                const nameA= a.name.normalize('NFC').replace(/[\u0300-\u036f]/g, '').toLowerCase()  
                const nameB= b.name.normalize('NFC').replace(/[\u0300-\u036f]/g, '').toLowerCase()
                return nameA < nameB ? -1 : 1                
            }) 
            return{
                ...state,
                allDrivers: orderAZ,
                filteredDrivers: orderAZ,
            }
        }else if (action.payload === "za"){
            const orderZA= [...driversToOrder].sort((a,b)=>{
                const nameA= a.name.normalize('NFC').replace(/[\u0300-\u036f]/g, '').toLowerCase()  
                const nameB= b.name.normalize('NFC').replace(/[\u0300-\u036f]/g, '').toLowerCase()
                return nameA > nameB ? -1 : 1
            }) 
            
            return {
                ...state,
                allDrivers: orderZA,
                filteredDrivers: orderZA
            }
        }else if (action.payload === "date_asc"){
                const orderDateAsc= [...driversToOrder].sort((a,b)=>{
                    const nameA = new Date(a.dob)
                    const nameB = new Date(b.dob)
                    return nameA > nameB ? -1 : 1
                })
             return {
                 ...state,
                 allDrivers: orderDateAsc,
                filteredDrivers: orderDateAsc
            }
        }else if (action.payload === "date_desc"){
            const orderDateDesc= [...driversToOrder].sort ((a,b)=>{
                const nameA= new Date(a.dob)
                const nameB= new Date(b.dob)
                return nameA < nameB ? -1 : 1
            })
            return {
                ...state,
                allDrivers: orderDateDesc,
                filteredDrivers:orderDateDesc
            }
        }

    default:
        return {...state}
}};

export default reducer;