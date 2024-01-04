/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import StudentsTable from '../components/students/StudentsTable';
import Button from '../components/button/Button';
import { CiCirclePlus } from "react-icons/ci";
import StudentModal from '../components/students/StudentModal';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import {Form ,useNavigation ,useActionData ,useNavigate ,redirect} from 'react-router-dom'
import DeleteConfirmation from '../components/delete/deleteConfirmation';
import ClassroomModal from '../components/classrooms/ClassroomModal';
import ClassroomsTable from '../components/classrooms/ClassroomsTable';
import TeachersTable from '../components/teachers/TeachersTable';
import TeacherModal from '../components/teachers/TeacherModal';

function TeachersPage(props) {
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingTeacher , setdDeletingTeacher] = useState(null);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const { data:teachers , isLoading , error , fetchData } = useFetch("http://localhost:5251/api/Teachers");

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Teacher Created' || data.Message == 'Teacher Updated' || data.Message == 'Teacher Deleted') ) 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/Teachers");
        }
        else{
            console.log('whatggs');
        }
    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Teacher Created' || data.Message == 'Teacher Updated' || data.Message == 'Teacher Deleted')) 
        {
            if(data.Message == 'Teacher Created' || data.Message == 'Teacher Updated')
            {
                setIsModalOpen(false);
            }
            else if(data.Message == 'Teacher Deleted')
            {
                setIsDeleteConfirmationOpen(false)
            }
            
        }
    },[data,navigate]);
    

    function handleAddTeacher() {
        setIsModalOpen(true);
    }

    function closeModal() {
        if(editingTeacher){
            setEditingTeacher(null);
        }
        setIsModalOpen(false);
        
    }

    function handleEdit(data){
        console.log('teache' , data);
        setEditingTeacher(data)
        setIsModalOpen(true);
    }

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingTeacher(data.TeacherId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }

    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Teachers</span>
            <Button onClick={() => {handleAddTeacher()}} className='bg-colorGreenDark hidden lg:inline-block'>Add New Teacher</Button>
            <Button onClick={() => {handleAddTeacher()}} className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
         </div>
          {teachers.length > 0 && <TeachersTable handleEdit={handleEdit} handleDelete={handleDelete} teachers={teachers}/>} 
         {isModalOpen && <TeacherModal editTeacher={editingTeacher ? editingTeacher: null} closeModal={closeModal} />}
         {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/teachers" recordId={deletingTeacher} handleDeleteCancel={handleDeleteCancel} />}
        </>
    );
}

export default TeachersPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
  
    if(method == 'POST')
    {
        const teacher = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            emailAddress: formData.get("email"),
            contactNo: formData.get("contact-number"),
          };

        try {
            const response = await axios.post("http://localhost:5251/api/Teachers", teacher);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    else if(method == 'PUT')
    {   
        const teacher = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        emailAddress: formData.get("email"),
        contactNo: formData.get("contact-number"),
        };
        const teacherId = formData.get("editTeacherId");
        try {
            const response = await axios.put(`http://localhost:5251/api/Teachers/${teacherId}`, teacher);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    } else if(method == 'DELETE')
    {
        const teacherId = formData.get("delRecId");
        try {
            const response = await axios.delete(`http://localhost:5251/api/Teachers/${teacherId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }

  }