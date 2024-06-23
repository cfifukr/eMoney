import React, { useEffect, useState } from "react";
import api from "../../api/axios"
import { getConfig } from "../../utils/jwtToken";
import Comment from "./Comment";
import "./Comments.css"
import { ListGroup } from "react-bootstrap";
import AddCommentForm from "./AddCommentForm";

function Comments({blogId, setTotalPages, currentPage, setCurrentPage}){
    const [commentsData, setCommentsData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(7);


    const getCommentsData = async(pageFun, sizeFun) => {
        try{
            const response = await api.get(`/api/v1/blogs/${blogId}/comments?page=${currentPage}&size=${sizeFun}`, getConfig());
            console.log(response);
            setCommentsData([...commentsData, ...response.data.list]);
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPage);
            
        }catch(err){
            console.log(err);
        }

    }

    
    useEffect(()=>{
        getCommentsData(page, size);

    }, [currentPage]);

   

    return <>
        <div className="comments-container">
            <div className="row">


                <div className="col"> 
                    <h3 style={{fontSize:"x-large"}} className="reddit-black-font">{commentsData.length > 0 ? "" : "No "}Comments</h3>
                </div>

                <div className="col" style={{textAlign:"end"}}>
                    <AddCommentForm blogId={blogId} commentsData={commentsData} setCommentsData={setCommentsData}/>
                </div>
                


            </div>

            

            
            <ListGroup>
            {commentsData.map((comment) =>{
                return <>
                    <ListGroup.Item key={comment.id} className="comments-list-item">
                        <Comment key={comment.id} comment = {comment}/>
                    </ListGroup.Item>
                </>
            })}
            </ListGroup>
            


        </div>
    </>
}

export default Comments;