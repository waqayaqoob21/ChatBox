import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Post() {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    console.log("current user is", userData);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [listOfComments, setListOfComments] = useState([]);

    let { id } = useParams()
    const [ postObject, SetPostObject] = useState({});
    useEffect(() => {

        if (token) {
            // Send the GET request with the token in the Authorization header
            axios.get(`http://localhost:3001/posts/byId/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token in 'Bearer <token>' format
                    },
                })
                .then((response) => {
                    debugger;
                    console.log("this is returned response by the post", response.data.data.post);
                    SetPostObject(response.data.data.post);
                    setListOfComments(response.data.data.comments);
                    console.log("this list of comments on this post", response.data.data.comments);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        } else {
            console.log("No token found, redirecting to login or show an error.");
        }
    }, []);
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && comment.trim()) {
            console.log("Comment submitted:", postObject.id,userData.id,comment);
            let data = {
                PostId: postObject.id,
                UserId: userData,
                commentBody: comment
            }
            axios.post("http://localhost:3001/comments", data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token in 'Bearer <token>' format
                },
            }).then((response) =>{
            setListOfComments(response.data.data)
            // Navigate to the home page after success
            console.log("It worked! :)",listOfComments);

            }).catch((error) => {
            console.error("An error occurred:", error);
            });
            // Add logic to handle the submitted comment, e.g., API call
            setComment(""); // Clear the input field after submission
        }
    };
    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title'>{postObject.title}</div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
            {/* Existing Comments */}
            <div id="comments-list" style={{
                    width: "300px",
                    height: "400px",
                    overflowY: "scroll", // Use camelCase for 'overflow-y'
                    border: "1px solid #ccc",
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                }}>
            {listOfComments.map((comment) => (
                <div className="comment" key={comment.id}>
                <div className="author">User {comment.UserId || 'Anonymous'}</div>
                <div className="text">{comment.commentBody}</div>
                <div className="timestamp">{new Date(comment.createdAt).toLocaleString()}</div>
                </div>
            ))}

            </div>
            <div>
            <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
            </div>
        
        </div>
    )
}

export default Post
