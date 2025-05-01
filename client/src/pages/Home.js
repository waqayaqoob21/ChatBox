import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [ listOfPosts, setListOfPosts ] = useState([]); 
    let navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {

        if (token) {
            // Send the GET request with the token in the Authorization header
            axios.get("http://localhost:3001/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token in 'Bearer <token>' format
                    },
                })
                .then((response) => {
                    setListOfPosts(response.data);
                    console.log("this list of post", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        } else {
            console.log("No token found, redirecting to login or show an error.");
        }
    }, []);

  return (
    <div>
        { listOfPosts.map((value, key)=>{
          return <div className='post' onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className='title'> { value.title } </div>
            <div className='body'> { value.postText } </div>
            <div className='footer'> { value.username } </div>
          </div>;
        })}
    </div>
  )
}

export default Home
