import './landing.css'
import { NavLink } from "react-router-dom";
const Landing = ()=>{
    return (
        <div className='landing-body'>
        <div className='landing'>
             <img className='logo' src='https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-1.png'  alt="Formula 1"></img>
            <h3>Welcome to my Driver project </h3>
            <NavLink to='/home'><button className='button'>Enter</button></NavLink>
        </div>
        </div>
    )
};
export default Landing;