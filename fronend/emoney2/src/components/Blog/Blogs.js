import React, { useEffect, useState } from "react";
import "./Blogs.css"
import { InputGroup, Form, Button,Alert } from "react-bootstrap";
import BlogCards from "./BlogCards";
import api from "../../api/axios"
import { getConfig, isJwtToken } from "../../utils/jwtToken";
import FooterComp from "../FooterComp"
import PaginationComp from "../PaginationComp";


function Blogs(){
    const [blogsData, setBlogsData] = useState([]);
    const [blogDto , setBlogDto] = useState([]);
    const config = getConfig()
    const[page, setPage] = useState(0);
    const[size, setSize] = useState(12);
    const [isLogged, setIsLogged] = useState(false);

    const checkToken = async () => {
        try {
            const tokenExists = await isJwtToken();
            setIsLogged(tokenExists);
        } catch (error) {
            console.error("Error checking JWT token:", error);
            setIsLogged(false); 
        }
    };


    const getBlogData = async(page, size) =>{
        try{
            const response = await api.get(`/api/v1/blogs/all?page=${page}&size=${size}`, config);
            setBlogDto(response.data)
            setBlogsData(response.data.list);
            
            
        }catch(err){
            console.log(err);
        }

    }
    
    
    useEffect(()=>{
        getBlogData(page, size);
        checkToken();

    },[page, size]);


    return <>
    {isLogged ?
        <div className="container-page">
            
            <InputGroup className="search-containe">
                <Form.Control
                placeholder="Search blog (disabled for now)"
                aria-label="Search blog "
                aria-describedby="basic-addon2"
                disabled
                />
                <Button variant="outline-secondary btn-outline-success" id="button-addon2" disabled>
                    Button
                </Button>
            </InputGroup>
            
            <div className="container-blogs">
                
                <BlogCards blogs={blogsData}/>
                <PaginationComp dto={blogDto} setCurrentPage={setPage}/>

            </div>
            
        </div>
        
        :
        <div style={{height:"80vh"}}>
            <Alert variant="danger" className="px-auto text-center" style={{margin:"4rem 4rem"}}>
                <h2 className="reddit-bold-font">Firstly, you need to login</h2>
            </Alert>
        </div>}


        <FooterComp/>
    </>
} 

export default Blogs;