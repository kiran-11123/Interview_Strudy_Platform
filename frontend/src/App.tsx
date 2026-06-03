
import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Signin from './components/Auth_Pages/Signin';
import Signup from './components/Auth_Pages/Signup';
import HomePage from './components/Home_Pages/Home';
import DashBoard from './components/Dashboard/DashBoard';
import ProtectedRoute from './protectedRoute';
import {CourseDetails} from './components/Courses/course_details';

function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') ;
    const parsedAuth = isAuthenticated ? JSON.parse(isAuthenticated) : null;
    const isAuthValid = parsedAuth && parsedAuth.isAuthenticated && parsedAuth.expiry > Date.now();
    const   isAdmin = parsedAuth && parsedAuth.isAdmin;

    if(!isAuthValid){
      localStorage.removeItem('isAuthenticated');
    }



  return(
    <BrowserRouter >

    <Routes>

        <Route path="/" element = {<DashBoard /> } />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthValid ?true : false}>
              <HomePage isAdmin={isAdmin} />
            </ProtectedRoute>
          } />

          <Route 
            
            path="/course/:CourseId"

            element={
              <ProtectedRoute isAuthenticated={isAuthValid?true : false}>
                 
                 <CourseDetails isAdmin={isAdmin} />

              </ProtectedRoute>
            }
          
          
          />

    </Routes>
    
    
    </BrowserRouter>
  )

  
}

export default App
