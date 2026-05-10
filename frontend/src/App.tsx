
import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Signin from './components/Auth_Pages/Signin';
import Signup from './components/Auth_Pages/Signup';
import HomePage from './components/Home_Pages/Home';
import DashBoard from './components/Dashboard/DashBoard';
import ProtectedRoute from './protectedRoute';


function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return(
    <BrowserRouter >

    <Routes>

        <Route path="/" element = {<DashBoard /> } />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          } />

    </Routes>
    
    
    </BrowserRouter>
  )

  
}

export default App
