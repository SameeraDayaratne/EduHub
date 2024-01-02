import { Children } from "react"
import Sidebar from "./components/sidebar/Sidebar"
import StudentPage from "./pages/StudentPage"
import TeachersPage from "./pages/TeachersPage"
import {createBrowserRouter , RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Sidebar />,
    children : [
      {path : 'students' , element : <StudentPage />},
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
