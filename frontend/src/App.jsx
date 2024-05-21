import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <Routes>
                    <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
                    <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                    <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
                </Routes>
            </div>
            <Toaster />
        </div>
    );
}

export default App;
