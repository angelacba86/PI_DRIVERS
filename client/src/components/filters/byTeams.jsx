/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import './filters.css'
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getTeamList,filterbyTeam} from "../../redux/actions";


const ByTeams= ({setCurrentPage,setLastFilterApplied})=>{

   ///--- Team List ---///
   const dispatch= useDispatch();
   
   useEffect(()=>{
      dispatch(getTeamList())
   },[dispatch])
   
   const teamList = useSelector(state=> state.teamList);
   const allDrivers = useSelector( state => state.allDrivers);
   const selectedTeams = new Set(allDrivers?.flatMap(select =>select.teams?.split(',').map(team=>team.trim().toLowerCase())))
   const listToShow= teamList?.filter(team=>selectedTeams.has(team.name.toLowerCase()))

   ///---handleSelect---///
   const handleSelect = event =>{
      const teamName= event.target.value;
      dispatch(filterbyTeam(teamName));
      setCurrentPage(1)
      setLastFilterApplied("teams")
   }
    return (
       <div>
         <label className="filters">Filter by Teams: </label><br/>
         <select onChange={handleSelect} className='filter-team'>
            <option selected value=''>All Teams</option>
            {listToShow?.map(team => (
               <option key={team.id} value={team.name}>{team.name}</option>
            ))}
         </select>
       </div>
    )   
   }
   export default ByTeams;