/* eslint-disable no-undef */
import '../New_Driver/newDriver.css'
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { postNewDriver,getTeamList } from '../../redux/actions';
import { validate } from '../../utils/utils';

const NewDriver= ()=>{ 
///--- list of Teams---///
  const teamList = useSelector(state=> state.teamList);
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getTeamList())
 },[])

///--- set info ---///
  const [form, setForm]=useState({
    name:'',
    surname:'',
    nationality:'',
    image:'',
    dob:'',
    description:'',
    teams:[]
  });
 const [errors,setErrors]=useState({});

 const [sendForm, setSendForm] = useState("");

 const handleInputChange= (event) => {  
  const {name,value}=event.target
  if(name==='teams'){
    setForm( form => {
      if (!form[name].includes(value)) {
        return {
          ...form,
          [name]: [...form[name], value]
        }
      } else {
        return form;
      }
    })
  } else {
    setForm(form => ({
      ...form,
      [name]:value
    }))
  }
  const validateErrors= validate({
    ...form,
    [name]: value
  })
  setErrors(validateErrors)
}
///---submint form ---///
  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(postNewDriver(form))
    setSendForm('Form successfully submitted')
    setForm({
      name: '',
      surname: '',
      nationality: '',
      image: '',
      dob: '',
      description: '',
      teams: []
  });
  }

///---remove teams---///
const handleRemove = (teamToRemove) => {
  setForm({
    ...form,
    teams: form.teams.filter(team => team !== teamToRemove)
  });
};

    return(
        <div className='form-container'>
            <h3>Create a new driver</h3>
  <div>
            <form onSubmit={handleSubmit}>
  <label className="form-label" >Name: </label>
  <input className="form-input" type="text" name="name" value={form.name} onChange={handleInputChange}/>
  <label className='form-error'>{errors.name}</label>

  <label className="form-label">Surname: </label>
  <input className="form-input" type="text" name="surname" value={form.surname} onChange={handleInputChange}/>
  <label className='form-error'>{errors.surname}</label>

  <label className="form-label">Nationality: </label>
  <input className="form-input" type="text" name="nationality" value={form.nationality} onChange={handleInputChange}/>
 <label className='form-error'>{errors.nationality}</label>

  <label className="form-label">Image: </label>
  <input className="form-input" type="text" name="image" value={form.image} onChange={handleInputChange}/>
 <label className='form-error'>{errors.image}</label>
 
  <label className="form-label">Date of Bird: </label>
  <input className="form-input" type="date" name="dob" value={form.dob} onChange={handleInputChange}/>
  <label className='form-error'>{errors.dob}</label>

  <label className="form-label">Description: </label>
  <input className="form-input-description" type="text" name="description"  value={form.description}  onChange={handleInputChange}/>
  <label className='form-error'>{errors.description}</label>

  <label className="form-label">Choose your team(s): </label>
  <select multiple className="form-input-date" name="teams" value={form.teams}  onChange={handleInputChange}>
  <option value="" disabled>{"---Choose your Team(s)---"}</option>
  {teamList?.map(team => (
               <option key={team.id} value={team.name}>{team.name}</option>
            ))}
  </select>
  
  {form.teams?.map(select =>(
    <button className="form-chosen-teams" key={select} id={select} onClick={() => handleRemove(select)}>{`${select} x`}</button>
  ))}<br/>
  <label className='form-error'>{errors.teams}</label><br/><br/>
  <button disabled={Object.keys(errors).length > 0 || Object.values(form).some(value => !value)} 
  className={`form-button ${Object.keys(errors).length > 0 || Object.values(form).some(value => !value) ? 'disable' : 'active'}`}>Create a Driver</button><br/>
  <label className='form-sendForm'>{sendForm}</label>
</form>
</div>
        </div>
    )
};

export default NewDriver;