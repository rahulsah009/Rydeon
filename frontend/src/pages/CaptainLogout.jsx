import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () =>{

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/captain-login')
            console.log("hi")
        }
    }).catch((error) => {
        console.error('Logout failed:', error.response?.data)
    })

    useEffect(() => {
      if(!token){
        navigate('/captain-login')
      }
    }, [token])
    

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout