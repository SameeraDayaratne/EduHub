/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { NavLink , Outlet , useLocation  } from 'react-router-dom';
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher , FaArrowLeft  } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar(props) {
    const [isSidebarCollapsed , setIsSidebarCollapsed ] = useState(false);
    const location = useLocation();
    const pathName = location.pathname.split('/')[1];

    function collapesMenu() {
        setIsSidebarCollapsed(prev => !prev)
    }



    let navItemClass = 'relative cursor-pointer grid grid-cols-[40px_1fr] py-2 px-4 pl-8 my-2 mx-0 items-center before:absolute before:content-[""] before:top-0 before:right-0 before:w-0 before:h-full before:bg-colorGreenDark before:rounded-b-md before:rounded-t-md  after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-activeNavLinkHover after:z-10 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full after:text-white'
    return (
        <>
        <div className='p-4 gap-4 sm:p-10 flex h-screen sm:gap-10 transition-all ease-in-out duration-300'>
            <div className={`fixed sm:translate-x-[0%] h-[calc(100%-2rem)] z-40 sm:z-0 sm:h-full w-60  sm:relative flex flex-col text-colorGrey3 justify-between bg-themeBg2 border-2 border-borderColor2 rounded-2xl transition-all ease-in-out ${isSidebarCollapsed ? 'transition-transform translate-x-[-107%]' : 'translate-x-[0%]'} `}>
                <button className={`sm:hidden toggle-nav p-2 absolute -right-9 top-9 rounded-r-lg border-2 border-l-themeBg2 border-r-borderColor2 border-y-borderColor2 bg-themeBg2 `}>
                    {isSidebarCollapsed  ? <GiHamburgerMenu onClick={collapesMenu} /> : <FaArrowLeft onClick={collapesMenu}/>}
                </button>
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
            <div className='w-full bg-themeBg2 border-2 border-borderColor2 rounded-2xl p-8 overflow-auto'>
                <Outlet />
            </div>
            
        </div>

        </>
        
    );
}

export default Sidebar;