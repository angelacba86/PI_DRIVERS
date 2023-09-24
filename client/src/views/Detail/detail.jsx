import './detail.css'
import {useEffect} from 'react'
import {useParams,NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
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
        <div className='contenedor-detail' key={driverDetail.id}>
            <div className='contenedor-imagen-detail'>
                <img className='imagen-detail' src={driverDetail.image}/>
                </div>
            <div className='contenedor-texto-detail'>
              <div className='origin-detail'>
                <p>{driverDetail.origin}</p>
                </div>
            <div className='titulo-detail'>
                <h2>{`${driverDetail.name} ${driverDetail.surname}`}</h2></div>
            <div className='id-detail'>
                <p>ID:{driverDetail.id}</p>
                </div>
            <div className='texto-detail'>
                <p>Nationality: {driverDetail.nationality}</p>
                <p>Description: {driverDetail.description}</p>
                <p>Date of birth: {driverDetail.dob}</p>
                <p>Teams: {driverDetail.teams}</p>
                </div>

            <div><NavLink to='/home'><button className='back-button'>Back</button></NavLink></div>
            </div>
            
        </div>
    )
};
export default Detail;