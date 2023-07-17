import './App.css';
import { BrowserRouter, Routes, Route, redirect, useNavigate  } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Homepage from './pages/homepage/Homepage';
import { useEffect, useState } from 'react';
import { fetchData, getUser } from './features/auth/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUser from './pages/edituser/EditUser';

function App() {
  const [isLoggedin,setIsLoggedin] = useState(false)
  const [loader,setLoader] = useState(false)
  const token =localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(()=>{
    if(token){
      dispatch(fetchData());
      dispatch(getUser(token));
      setIsLoggedin(true);
    }else{
      setIsLoggedin(false)
    }
  },[token])
  const loginuser = useSelector((state) => (state.user));

  return (
    <BrowserRouter>
        <ToastContainer/>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/' element={isLoggedin?<Homepage loader={loader} setLoader={setLoader}  setIsLoggedin={setIsLoggedin}/>:<Login/>}/>
        <Route path='/user/:id' element={<EditUser loader={loader} setLoader={setLoader} />}/>
        <Route path='/new-user' element={<EditUser loader={loader} setLoader={setLoader} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
