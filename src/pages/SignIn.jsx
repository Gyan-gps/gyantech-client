import { useState } from 'react'
import axios from 'axios';
import { endpoint } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function SignIn(){
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{

        if(user){
            
            navigate('/')
        }
    },[user])
    const [userDetails,setUserDetails] = useState({
        userName:"",
        userNumber:"",
        userEmail:"",
        userPassword:""
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setUserDetails({
            ...userDetails,
            [name]:value
        })
    }
    const handleSubmit = (e)=>{
        axios.post(endpoint+"signup",userDetails)
        .then(res=>{
            console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data.data));
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            Name<br/>
            <input type="text" value={userDetails.userName} name="userName" onChange={handleChange} placeholder="Enter your name" /><br/><br/>
            Mobile Number<br/>
            <input type="number" value={userDetails.userNumber} name="userNumber" onChange={handleChange} placeholder="Enter Mobile Number" /><br/><br/>
            Email<br/>
            <input type="email" value={userDetails.userEmail} name="userEmail" onChange={handleChange} placeholder="Enter your Email" /><br/><br/>
            Password<br/>
            <input type="text" value={userDetails.userPassword} name="userPassword" onChange={handleChange} placeholder="Enter your Email" /><br/><br/>
            {/* Name<br/>
            <input type="text" placeholder="Enter your name" />
            Name<br/>
            <input type="text" placeholder="Enter your name" />
            Name<br/>
            <input type="text" placeholder="Enter your name" />
            Name<br/>
            <input type="text" placeholder="Enter your name" /> */}
            <button onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default SignIn