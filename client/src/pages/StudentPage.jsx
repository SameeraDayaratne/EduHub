/* eslint-disable no-unused-vars */
import React from 'react';
import StudentsTable from '../components/students/StudentsTable';

function StudentPage(props) {
    return (
        <>
         <div className='flex justify-between'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-green-600 after:w-[50%] text-xl'>Students</span>
            <button>Add new</button>
         </div>
         <StudentsTable />
        </>
       
    );
}

export default StudentPage;