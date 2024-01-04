import Sidebar from "./components/sidebar/Sidebar"
import StudentPage from "./pages/StudentPage"
import TeachersPage ,{action as handleTeacherActions} from "./pages/TeachersPage"
import {action as handleStudentCreation} from './pages/StudentPage'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import ClassroomPage from "./pages/ClassroomPage"
import SubjectsPage from "./pages/SubjectsPage"
import {action as handleClassroomActions} from './pages/ClassroomPage'



const router = createBrowserRouter([
  {
    path : '/',
    element : <Sidebar />,
    children : [
      {path : 'students' , element : <StudentPage /> ,  action : handleStudentCreation},
      {path : 'teachers' , element : <TeachersPage /> , action : handleTeacherActions},
      {path : 'classrooms' , element : <ClassroomPage />, action:handleClassroomActions},
      {path : 'subjects' , element : <SubjectsPage />}
    ]
  }
])


function App() {

  return (
    <>
    
      <RouterProvider router={router}>
      </RouterProvider>
        
    </>
  )
}

export default App
