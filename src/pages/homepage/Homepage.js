import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getUser } from '../../features/auth/authAction';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../features/auth/authAction';
import Search from '../../components/Search/Search';

const Homepage = ({loader,setLoader,setIsLoggedin}) => {
  const [searchInputText,setSearchInputText] = useState('')

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchData())
    dispatch(getUser())
  },[loader])
  const user = useSelector((state) => (state.users));


  return (
    <div>
        <Navbar searchInputText={searchInputText} setSearchInputText={setSearchInputText} setIsLoggedin={setIsLoggedin}/>
        <Search searchInputText={searchInputText} setSearchInputText={setSearchInputText} />
        <div className='container mt-5'>
          <h1>Users Table</h1>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Number</th>
                <th> Name </th>
                <th> Email </th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {
                searchInputText
                ?
                user?.filter(user=>user.name.includes(searchInputText)||user.email.includes(searchInputText)).map((user,index)=><tr className='text-danger m-3 p-4 ' key={user?._id}>
                <td>{index+1}</td>
                <td>{user?.name} </td>
                <td>{user?.email} </td>
                <td>
                  <Link to={`/user/${user?._id||1}`} className='btn btn-primary m-2'>Edit</Link>
                  <button className='btn btn-danger m-2' onClick={()=>dispatch(deleteUser(user?._id))}>Delete</button>
                </td>
              </tr>)
                :

              user?.length&&user.map((user,index) => (
                <tr className='text-danger m-3 p-4 ' key={user?._id}>
                  <td>{index+1}</td>
                  <td>{user?.name} </td>
                  <td>{user?.email} </td>
                  <td>
                    <Link to={`/user/${user?._id||1}`} className='btn btn-primary m-2'>Edit</Link>
                    <button className='btn btn-danger m-2' onClick={()=>dispatch(deleteUser(user?._id))}>Delete</button>
                  </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Homepage
