/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink , Outlet , useLocation  } from 'react-router-dom';
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

function Sidebar(props) {

    const location = useLocation();
    const pathName = location.pathname.split('/')[1];




    let navItemClass = 'relative cursor-pointer grid grid-cols-[40px_1fr] py-2 px-4 pl-8 my-2 mx-0 items-center before:absolute before:content-[""] before:top-0 before:right-0 before:w-0 before:h-full before:bg-colorGreenDark before:rounded-b-md before:rounded-t-md  after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-activeNavLinkHover after:z-10 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full after:text-white'
    return (
        <>
        <div className='p-10 flex h-screen gap-10'>
            <div className='w-60 relative flex flex-col text-colorGrey3 justify-between bg-themeBg2 border-2 border-borderColor2 rounded-2xl  '>
                <div className='m-6 pt-4 px-3 relative text-colorGrey0'>
                    <h2>EduHub</h2>
                </div>
                <ul className='flex flex-col'>
                    <li className={`${navItemClass} ${pathName == 'students' && 'bg-activeNavLink before:w-1 text-white'} `}><PiStudent/><NavLink to='students' className={({isActive}) => (isActive ? 'text-white' : 'z-20')} >Students</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'teachers' && 'bg-activeNavLink before:w-1 text-white'} `}><FaChalkboardTeacher/> <NavLink to='teachers' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Teachers</NavLink></li> 
                   
                </ul>
                <div>
                    <h2>Developed by Sameera Dayaratne</h2>
                </div>
            </div>
            <Outlet />
        </div>

        </>
        
    );
}

export default Sidebar;