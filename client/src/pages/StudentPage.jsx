/* eslint-disable no-unused-vars */
import React from 'react';
import StudentsTable from '../components/students/StudentsTable';
import Button from '../components/button/Button';
import { CiCirclePlus } from "react-icons/ci";

function StudentPage(props) {
    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Students</span>
            <Button onClick={() => console.log('hehe')} className='bg-colorGreenDark hidden lg:inline-block'>Add New Student</Button>
            <Button className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
         </div>
         <StudentsTable />
        </>
       
    );
}

export default StudentPage;