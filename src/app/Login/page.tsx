"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { NextResponse } from 'next/server'
import {toast} from 'react-hot-toast'
function Login() {
    const router = useRouter()
    const [user, setuser] = React.useState({
      email:"",
      password:"",
    });
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setbuttonDisabled(false)
       }else{
        setbuttonDisabled(true);
       }
    },[user])

    const onLogin = async()=>{
     try {
       setLoading(true)
       const response = await axios.post('/api/Users/Login',user);
       console.log(response.data,"login success")
       toast.success("Login success")
       router.push('/Profile')

     } catch (error:any) {
        console.log("login failed")
        toast.error(error.message)
     }finally{
      setLoading(false)
     }
    }
  return (
    <div>
        <div className='d-flex justify-content-center'>
            <h1>{loading ? "processing":"Login"}</h1>
        </div>
        <div className='d-flex justify-content-center'>
            <input
             type='text'
              value={user.email} 
              placeholder='Name'
              id='email'
              onChange={(e)=>setuser({...user,email:e.target.value})}

               />
        </div>
        <div className='d-flex justify-content-center'>
            <input
             type='password'
              value={user.password} 
              placeholder='Name'
              id='password'
              onChange={(e)=>setuser({...user,password:e.target.value})}

               />
        </div>
       <div className='d-flex justify-content-center' >
       <button onClick={onLogin} className='btn btn-primary'>Login</button>
       
       </div>
       <div className='d-flex justify-content-center'>
       <Link href='/Register'>visit to register here</Link>
       </div>
    </div>
  )
}

export default Login