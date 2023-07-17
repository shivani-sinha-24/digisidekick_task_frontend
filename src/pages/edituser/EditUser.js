import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchData, updateUser } from '../../features/auth/authAction';

const validationSchema =  Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EditUser = ({loader,setLoader}) => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchData())
    },[loader])
    const user = useSelector(state=>state?.users?.filter(user=>user._id==params.id))
    const formik = useFormik({
        initialValues:{
            name: user[0]?.name ||"",
            email: user[0]?.email ||""
        },
        validationSchema:validationSchema,
        onSubmit: values=>{
            if(user[0]){
                values = {...values,id:params?.id}
                setLoader(false)
                dispatch(updateUser(values));
                setLoader(true)
                dispatch(fetchData())
                navigate('/')

            }else{
                setLoader(false)
                dispatch(createUser(values))
                navigate('/')
                setLoader(true)
                dispatch(fetchData())
            }
        }
    })
  return (
    <div className='container mt-5'>
      <h1>{params?.id?'Edit User':'Create New User'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputname1" className="form-label">Name</label>
            <input type="name" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="exampleInputname1" aria-describedby="nameHelp"/>
            {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputemali1" className="form-label">Email Address</label>
            <input type="emali" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="exampleInputemali1"/>
            {formik.touched.email && formik.errors.email 
            ? 
                <div className="text-danger">{formik.errors.email}</div>
            :
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            }
        </div>
        <button type="submit" className="btn btn-primary" onClick={e=>{formik.handleSubmit()}}>{params?.id?'Edit':'Submit'}</button>
      </form>
    </div>
  )
}

export default EditUser
