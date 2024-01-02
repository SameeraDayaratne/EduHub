/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink , Outlet } from 'react-router-dom';

function Sidebar(props) {
    return (
        <>
        <div className='flex'>
            <div className='h-screen'>
                Sidebar
                <ul className='flex flex-col'>
                    <NavLink to='students'><li>Studnets</li> </NavLink>
                    <NavLink to='teachers'><li>Teachers</li> </NavLink>
                </ul>
                
                
            </div>
        <Outlet />
        </div>

        </>
        
    );
}

export default Sidebar;