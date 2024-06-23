import React from "react";
import "./Comments.css"
import { FaUserCircle } from "react-icons/fa";

function Comment({comment}){


    return <>
        <div className=" py-1 comment-container row">

            <div className="icon col-3">
                <FaUserCircle />
                <div className="comment-author" >
                    {console.log(comment)}
                    <p className="reddit-bold-font">{comment.username}</p>

                </div>

                <div className="rightline"></div>

            </div>
            
            <div className="col-9 comment-text">
                <div>
                    <p className="reddit-regular-font">{comment.text}</p>
                </div>
            </div>
            
            
            

        </div>

    </>
}
export default Comment;