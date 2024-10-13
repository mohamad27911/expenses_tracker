import './index.css';
import Registration from './pages/Registration';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './Components/firebase/AuthRoute';
import Parent from './Components/Parent';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  return (
    <div className='mx-16'>
      <Parent/>
        {/* Logout button */}
        <div className="flex justify-center mt-5">
  <button
    onClick={() => signOut(auth)}
    type="button"
    className="bg-expense hover:scale-110 transition-transform text-white font-bold py-2 px-4 rounded w-fit"
  >
    Log Out From 
    <span className="text-primary"> {auth.currentUser?.email}</span>
  </button>
</div>
    </div>
  );
}

const AppWithProvider = () => {
  return (
  
      <Router>
        <Routes>
          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <AuthRoute>
                <App />
              </AuthRoute>
            }
          />
          <Route path="/" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default AppWithProvider;
