import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const initialValues = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().min(8).max(25).required(),
        password: Yup.string().min(5).max(10).required(),
    })

    const navigate = useNavigate();
    const onSubmit = (data) => { 
        axios.post("http://localhost:3001/login", data).then((response) =>{
            debugger;
        console.log("It worked! :)",response.data.data.id);
        localStorage.setItem('token', response.data.token);
        let userId = response.data.data.id;
        localStorage.setItem('user', userId);
        localStorage.setItem('username', response.data.data.username);
        // Navigate to the home page after success
        toast.success('Logged out successfully!');

        // navigate('/home');
        setTimeout(() => {
            window.location.href = '/home';
          }, 1000); // Delay to let the toast show before redirecting
        }).catch((error) => {
        console.error("An error occurred:", error);
        });
    }
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                
                <label>Email: </label>
                <ErrorMessage name='email' component='span' />
                <Field autoComplete='off' id='email' name='email' placeholder='(Waqar...)' />

                <label>Password: </label>
                <ErrorMessage name='password' component='span' />
                <Field autoComplete='off' id='password' name='password' placeholder='(Abfd1234%#*&...)' />

                <button type='submit'>Save</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login
