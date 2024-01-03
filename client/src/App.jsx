import Sidebar from "./components/sidebar/Sidebar"
import StudentPage from "./pages/StudentPage"
import TeachersPage from "./pages/TeachersPage"
import {action as handleStudentCreation} from './pages/StudentPage'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path : '/',
    element : <Sidebar />,
    children : [
      {path : 'students' , element : <StudentPage /> ,  action : handleStudentCreation},
      {path : 'teachers' , element : <TeachersPage />}
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
