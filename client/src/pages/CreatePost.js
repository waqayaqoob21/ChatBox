import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(10).required()
    })

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log("sending token",token);
    const onSubmit = (data) => { 
        axios.post("http://localhost:3001/posts", data, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token in 'Bearer <token>' format
            },
        }).then((response) =>{
        console.log("It worked! :)",response.data);
        // Navigate to the home page after success
        navigate('/home');
        }).catch((error) => {
        console.error("An error occurred:", error);
        });
    }
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name='title' component='span' />
                <Field autoComplete='off' id='title' name='title' placeholder='(Ex. John...)' />

                <label>Post Text: </label>
                <ErrorMessage name='postText' component='span' />
                <Field autoComplete='off' id='postText' name='postText' placeholder='Wall of Berlin' />

                <label>Username: </label>
                <ErrorMessage name='username' component='span' />
                <Field autoComplete='off' id='username' name='username' placeholder='(Waqar...)' />

                <button type='submit'>Save</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost
