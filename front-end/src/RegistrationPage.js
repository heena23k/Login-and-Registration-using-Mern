import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = React.useState({
        username:'',
        password:''
    })
    const handleRegistrationChange=(e)=>{
        const{name,value} = e.target;
        setRegistrationData((prevData)=>({...prevData,[name]:value}))

    }
    const handleRegistrationSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response  = await axios.post('http://localhost:8000/register',registrationData)  ;
            console.log("Registration response:", response.data);
            
        }
        catch(error){
            console.error("Error during registration:", error);
        }
        setRegistrationData({
            username:'',
            password:''
        })

    }
  return (
    <div>
    <h1> Registration Form</h1> 
    <form onSubmit={handleRegistrationSubmit}  >
    <input type='text' name='username' placeholder='Username' onChange={handleRegistrationChange}  value ={registrationData.username}required/>
    <input type='password' name='password' placeholder='Password'onChange={handleRegistrationChange} required/>
    <button type='submit'>Register</button>
    <p>Already have an account? <Link to='/login'>Login Here</Link></p>
    </form>
    </div>
  )
}

export default RegistrationPage;