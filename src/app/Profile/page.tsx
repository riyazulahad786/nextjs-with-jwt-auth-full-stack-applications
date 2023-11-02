"use client"
import React,{useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
function Profile() {
  const [data, setdata] = useState("nothing")
  const router = useRouter();
  const onLogout = async () => {
     try {
       await axios.get('/api/Users/Logout')
       toast.success("Logout success")
       router.push("/Login")
     } catch (error:any) {
         console.log(error.message)
         toast.error(error.message)
     }
  }

  const getUserDetails =async() => {
     const res = await axios.get("/api/Users/Person")
     setdata(res.data.data._id)
     console.log(res.data)

  }
  return (
    <div>
      {data === ''?"No data found":<Link href={`/Profile/${data}`}>{data}</Link>}

      <div className='d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={onLogout}>Logout</button>
        <button className='btn btn-primary mx-5' onClick={getUserDetails}>data from database</button>

      </div>
    </div>
  )
}

export default Profile