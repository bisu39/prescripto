import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx';
const NavBar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const {token, setToken,userData} = useContext(AppContext);
    const logoutHandler = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img src={userData.image} className='w-8 rounded-full' alt="" />
                            <img src={assets.dropdown_icon} className='w-2.5 group-hover:rotate-180 transition-transform duration-300 ease-in' alt="" />
                            <div className='short-cl'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate("my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate("my-appointments")} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={()=>logoutHandler()} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div> :
                        <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Log In</button>
                }
                <img onClick={() => setShowMenu(true)} className='sm:hidden' src={assets.menu_icon} alt="" />
                {/* ---mobile menu--- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)}  to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)}  to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)}  to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)}  to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p> </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
