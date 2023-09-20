import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import {getDetailById, clearDetail} from '../../redux/actions'
const Detail=()=>{

    const {id} = useParams();
    const dispatch=useDispatch();
    const driverDetail= useSelector(state=>state.byDetail)

    useEffect(()=>{
        dispatch(getDetailById(id))
    return ()=>{dispatch(clearDetail())}},[dispatch]);

    if (driverDetail.length < 1) {
        return <div>Loading...</div>;
    }

    return(
        <div key={driverDetail.id}>
            <h3>{`${driverDetail.name} ${driverDetail.surname}`}</h3>
            <img src={driverDetail.image}/>
            <p>Nationality:{driverDetail.nationality}</p>
            <p>Description:{driverDetail.description}</p>
            <p>Date of bird:{driverDetail.dob}</p>
            <p>Teams:{driverDetail.teams}</p>
            <p>Origin:{driverDetail.origin}</p>
        </div>
    )
};
export default Detail;