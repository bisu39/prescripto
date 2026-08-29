import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetPassword, setResetPassword] = useState(false)
  const { token, setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sing Up") {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          toast.success('You singed up seccessfully')
        } else {
          toast.error(data.message)
        }
      }
      if (state === 'Login' && resetPassword) {
        const { data } = await axios.post(backendUrl + '/api/user/reset-password', { email, password })
        if(data.success){
          toast.success(data.message)
          setEmail('')
          setPassword('')
        }else{
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sing Up' ? 'Create Account' : state === "Login" && resetPassword ? 'Reset Password' : 'Log in'}</p>
          {resetPassword ? <p>Reset your password to get back to your account</p> : <p>Please {state === 'Sing Up' ? 'sign up' : 'log in'} to book appointment</p>}
          {
            state === "Sing Up" &&
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" name="" id="" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" name="" id="" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className='w-full'>
            <p>{resetPassword && state === "Login" ? 'New password' : 'Password'} </p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} value={password} required />
            {state === "Login" && resetPassword || state === "Sing Up" ?
              '' : <p className='text-primary text-xs mt-2 font-bold' onClick={() => setResetPassword(!resetPassword)}>Reset password</p>
            }
          </div>
          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sing Up' ? 'Create Account' : state === "Login" && resetPassword ? 'Reset Password' : 'Log in'}</button>
          {
            state === "Sing Up" ?
              <p>Already have an account?<span className='text-primary underline cursor-pointer' onClick={() => setState('Login')}>Login here</span> </p>
              : <p>Create an new account ? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Sing Up'); setResetPassword(false) }}>click here</span> </p>
          }
        </div>
      </form>

    </div>
  )
}

export default Login
