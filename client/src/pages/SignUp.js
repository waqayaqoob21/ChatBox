import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const initialValues = {
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
        telno: "",
    }
    const validationSchema = Yup.object().shape({
        fname: Yup.string().required(),
        lname: Yup.string().required(),
        username: Yup.string().min(3).max(10).required(),
        email: Yup.string().min(8).max(15).required(),
        password: Yup.string().min(5).max(10).required(),
        telno: Yup.string().min(11).max(15).required()
    })

    const navigate = useNavigate();
    const onSubmit = (data) => { 
        axios.post("http://localhost:3001/signup", data).then((response) =>{
        console.log("It worked! :)",response.data);
        // Navigate to the home page after success
        navigate('/');
        }).catch((error) => {
        console.error("An error occurred:", error);
        });
    }
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>First Name: </label>
                <ErrorMessage name='fname' component='span' />
                <Field autoComplete='off' id='fname' name='fname' placeholder='(Ex. John...)' />

                <label>Last Name: </label>
                <ErrorMessage name='lname' component='span' />
                <Field autoComplete='off' id='lname' name='lname' placeholder='(Ex. David...)' />

                <label>Username: </label>
                <ErrorMessage name='username' component='span' />
                <Field autoComplete='off' id='username' name='username' placeholder='(Waqar...)' />

                <label>Email: </label>
                <ErrorMessage name='email' component='span' />
                <Field autoComplete='off' id='email' name='email' placeholder='(Waqar...)' />

                <label>Password: </label>
                <ErrorMessage name='password' component='span' />
                <Field autoComplete='off' id='password' name='password' placeholder='(Abfd1234%#*&...)' />

                <label>Telephone: </label>
                <ErrorMessage name='telno' component='span' />
                <Field autoComplete='off' id='telno' name='telno' placeholder='(+491254...)' />

                <button type='submit'>Save</button>
            </Form>
        </Formik>
    </div>
  )
}

export default SignUp
