/* eslint-disable no-unused-vars */
import React, { useEffect, useTransition } from 'react';
import StudentsTable from '../components/students/StudentsTable';
import Button from '../components/button/Button';
import { CiCirclePlus } from "react-icons/ci";
import StudentModal from '../components/students/StudentModal';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import {Form ,useNavigation ,useActionData ,useNavigate ,redirect} from 'react-router-dom'

function StudentPage(props) {

    const [isModalOpen , setIsModalOpen] = useState(false);
    const [editingStudent , setEditingStudent] = useState(null);
    const { data:students , isLoading , error , fetchData } = useFetch("http://localhost:5251/api/Students");

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && data.Message == 'Student Created') 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/Students");
        }
        else{
            console.log('whatggs');
        }
    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && data.Message == 'Student Created') 
        {
            console.log('closing modal');
            closeModal();
        }
    },[data,navigate]);
    

    function handleAddStudent() {
        setIsModalOpen(true);
    }

    function closeModal() {
        if(editingStudent){
            setEditingStudent(null);
        }
        setIsModalOpen(false);
        
    }

    function handleEdit(data){
        setEditingStudent(data)
        setIsModalOpen(true);
    }


    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Students</span>
            <Button onClick={() => {handleAddStudent()}} className='bg-colorGreenDark hidden lg:inline-block'>Add New Student</Button>
            <Button onClick={() => {handleAddStudent()}} className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
         </div>
          {students.length > 0 && <StudentsTable handleEdit={handleEdit} students={students}/>} 
         {isModalOpen && <StudentModal editStudent={editingStudent ? editingStudent : null} closeModal={closeModal} />}
         
        </>
       
    );
}

export default StudentPage;

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log('fa' , formData);
  
    const birthdateString = formData.get("dob");
    const birthdate = new Date(birthdateString);
    const currentDate = new Date();
    const studentAge = currentDate.getFullYear() - birthdate.getFullYear();
  
    const student = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      emailAddress: formData.get("email"),
      dateOfBirth: birthdateString,
      age : studentAge,
      contactPerson: formData.get("contact-person"),
      contactNo: formData.get("contact-number"),
      classroomId: formData.get("classroom"),
    };


  
    console.log('addded' , student);
     

   
    try {
      const response = await axios.post("http://localhost:5251/api/Students", student);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
    
  
    
  
   
  
    // try {
    //   const response = await auth.post("/login", user , {withCredentials : true});
  
    //   let responseOK = response && response.status === 200 && response.statusText === "OK";
    //   if(responseOK)
    //   {
    //       const accessToken =  response.data.accessToken;
    //       localStorage.setItem('accessToken' , accessToken);
    //       // console.log(response.data);
    //       return response.data;
    //       // return redirect('/');
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     // console.log(error.response.data);
    //     // console.log(error.response.status);
    //     // console.log(error.response.headers);
    //     return error.response.data;
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     return error.response.data;
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     // console.log('Error', error.message);
  
    //     return error.response.data;
    //   }
    // }
  }