import { NavLink } from "react-router-dom";
const Landing = ()=>{
    return (
        <div>
            <h3>Welcome to my Driver project </h3>
            <NavLink to='/home'><button>Enter</button></NavLink>
        </div>
    )
};
export default Landing;