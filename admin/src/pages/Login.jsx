import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContex } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContex)
  const [state, setState] = useState("admin");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === "admin") {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          setEmail('')
          setPassword('')
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          setEmail('')
          setPassword('')
          navigate('/doctor-profile')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto '><span className='text-primary'> {state[0].toUpperCase() + state.slice(1)}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className=' border border-[#DADADA] rounded w-full p-2 mt-1' type="email" placeholder='Enter your email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className=' border border-[#DADADA] rounded w-full p-2 mt-1' type="password" placeholder='Password' required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base '>Login</button>
        {
          state === "admin" ?
            <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState("doctor")}>Click Here</span></p> :
            <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState("admin")}>Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
