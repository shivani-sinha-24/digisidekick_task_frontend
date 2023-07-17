import axios from "axios";
import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure, fetchStarted, fetchSuccess, fetchFailure,updateRequest,updateSuccess,updateFailure,deleteRequest,deleteSuccess,deleteFailure,createRequest,createSuccess,createFailure,getUserStarted,getUserSuccess,getUserFailure } from "./authSlice";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = (values) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_URL}login`, values)
      const user = response.data.user;
      localStorage.setItem('token',response.data.user)
      toast.success(response.data.message);
      dispatch(loginSuccess(user));
  } catch (error) {
    toast.error(error.message);
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (values) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_URL}register`, values)

        if (response.data) {
            const user = response.data.user;
            dispatch(registerSuccess(user));
            toast.success(response.data.message);
        }
  } catch (error) {
    toast.error(error.message);
    dispatch(registerFailure(error.message));
  }
};

export const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchStarted());
  
      try {
        const response = await axios.get(`${API_URL}get-users`);
        dispatch(fetchSuccess( response.data.user )); // Wrap the users array in an object
      } catch (error) {
        dispatch(fetchFailure(error.message));
      }
    };
  };

  export const getUser = () => async (dispatch) => {
      dispatch(getUserStarted());
      const token = localStorage.getItem('token')
      try {
        const response = await axios.post(`${API_URL}get-userDetail`,{token:token});
        if(response.data){
          dispatch(getUserSuccess( response.data.user )); 
        }
      } catch (error) {
        dispatch(getUserFailure(error.message));
      }
  };

  export const createUser = (values) => async (dispatch)=>{
    dispatch(createRequest());
  
    try {
      const response = await axios.post(`${API_URL}create-user`, values)
          if (response.data) {
              const user = response.data.user;
              dispatch(createSuccess(user));
              toast.success(response.data.message);
          } 
    } catch (error) {
      toast.error(error.message);
      dispatch(createFailure(error.message));
    }
  }

  export const updateUser = (values) => async (dispatch) => {
    dispatch(updateRequest());
  
    try {
      const response = await axios.put(`${API_URL}update-user`, values)
          if (response.data) {
              const user = response.data.user;
              dispatch(updateSuccess(user));
              toast.success(response.data.message);
          }
    } catch (error) {
      toast.error(error.message);
      dispatch(updateFailure(error.message));
    }
  };

  export const deleteUser = (values) => async (dispatch) => {
    dispatch(deleteRequest());
  
    try {
      const response = await axios.delete(`${API_URL}delete-user/${values}`)
      .then(response=>{
  
          if (response.data) {
              const user = response.data.user;
              dispatch(deleteSuccess(user));
              toast.success(response.data.message);
          } 
      })
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteFailure(error.message));
    }
  };