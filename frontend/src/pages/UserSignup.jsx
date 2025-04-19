import React, { useContext, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'

const UserSignup = () => {

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    if (!firstname || !email || !password) {
      alert("All fields are required!");
      return;
    }
    const newUser = {
      fullname: {
        firstname,
        lastname
      },
      email:email.toLowerCase(),
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
  
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
        
        // Reset form fields
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data );
      alert(error.response?.data?.errors[0].msg);
    }
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value)
  }

  const handleLastnameChange = (e) => {
    setLastname(e.target.value)
  }

  return (
    <div className='h-screen flex justify-between flex-col bg-[#eeeeee]'>
      <form onSubmit={handleUserSubmit}>
        <div className='  flex flex-col  pt-8 '>
          <img className=' w-20 ml-8 mb-5' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
          <div className=' pb-7 py-3 px-4 '>
            <h3 className='pt-3 text-xl font-bold'>What's your name</h3>
            <div className='flex gap-4'>
              <input
                type="text"
                className='w-full bg-gray-100 py-3 px-2 rounded mb-5'
                placeholder='Firstname'
                minLength={3}
                value={firstname}
                required
                onChange={handleFirstnameChange}
              />
              <input
                type="text"
                className='w-full bg-gray-100 py-3 px-2 rounded mb-5'
                placeholder='Lastname'
                value={lastname}
                required
                onChange={handleLastnameChange}
              />
            </div>
            <h3 className='pb-1 text-xl font-bold'>Enter your email </h3>
            <input
              className='w-full bg-gray-100 py-3 px-2 rounded mb-5'
              type="email"
              placeholder='Email'
              required
              onChange={handleEmailChange}
              value={email} />
            <h3 className='pb-1 text-xl font-bold'>Enter password </h3>
            <input
              className='w-full bg-gray-100 py-3 px-2 rounded mb-5'
              type="password"
              placeholder='Password'
              minLength={6}
              required
              onChange={handlePasswordChange}
              value={password} />
            <button className='w-full flex justify-center items-center bg-neutral-900 text-white py-3 rounded mt-5 hover:bg-neutral-950 mb-2'>Signup</button>
            <p> already have account  ? <Link to={'/login'} className='text-blue-600'>Login</Link></p>
          </div>
        </div>
      </form>
      <div className='py-3 px-4 pb-5'>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup