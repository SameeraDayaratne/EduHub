/* eslint-disable no-unused-vars */
import React from 'react';
import useFetch from '../hooks/useFetch';
import { Form } from 'react-router-dom';
import Button from '../components/button/Button';
import axios from 'axios';
import AllocateSubjectsTable from '../components/allocateSubjects/allocateSubjectsTable';
import { useState } from 'react';

function AllocateSubjectsPage(props) {

    const { data:teachers , isLoadingTeachers , errorTeachers } = useFetch("http://localhost:5251/api/Teachers");
    const { data:subjects , isLoadingSubjects , errorSubjects } = useFetch("http://localhost:5251/api/Subjects");
    const { data:allocateSubjects , isLoadingallocateSubjects , errorallocateSubjects } = useFetch("http://localhost:5251/api/AllocateSubjects");
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingAllocatedSubject, setdDeletingAllocatedSubject] = useState(null);
    console.log(teachers);
    console.log(subjects);
    console.log(allocateSubjects);

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingAllocatedSubject(data.AllocateSubjectId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }
    return (
        <>
        <div className='flex justify-center items-center'>
           <span className=' relative pb-1 after:content-[""] after:absolute after:left-10   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Allocate Subjects</span>
        </div>
        
         <Form
         method="post"
         action="/allocateSubjects"
         
         >
         <div className='mt-10 flex gap-5 justify-center items-center'>
            <div className='flex flex-col gap-4 items-center'>
                <h2>Select a Teacher</h2>
            <select name="teachers" className="font-semibold rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-3 pl-8"     >
                <option disabled={true} >Select a Teacher</option>
                {teachers.map(teacher => (
                    <option key={teacher.TeacherId} value={teacher.TeacherId}  >{`${teacher.FirstName} ${teacher.LastName}`}</option>
                ))}
            </select>
            </div>
            <div className='flex flex-col gap-4 items-center'>
            <h2>Select a Subject</h2>
            <select name="subjects" className="font-semibold text-left rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-3 pl-8"     >
                <option disabled={true} >Select a Subject</option>
                {subjects.map(subject => (
                    <option key={subject.SubjectId} value={subject.SubjectId}  >{subject.SubjectName}</option>
                ))}
        </select>
            </div>
        
        
        </div>
        <div className='flex mt-5 gap-5 justify-center items-center'>
        <Button className='bg-colorGreenDark rounded-md text-lg px-5'>Allocate</Button>
        </div>
        
        </Form>   
        {allocateSubjects.length > 0 && <AllocateSubjectsTable handleDelete={handleDelete} allocateSubjects={allocateSubjects}/>} 
        
        </>
    );
}

export default AllocateSubjectsPage;

export async function action({ request, params }) {
    
    const formData = await request.formData();

    
    const allocatedSubject = {
        teacherId : formData.get("teachers"),  
        subjectId: formData.get("subjects")

      };

    console.log('allocat' , allocatedSubject);

        // try {
        //     const response = await axios.post("http://localhost:5251/api/subjects", );
        //     console.log(response.data);
        //     return response.data;
        //   } catch (error) {
        //     return error.response.data;
        //   }

        return null
    
}
