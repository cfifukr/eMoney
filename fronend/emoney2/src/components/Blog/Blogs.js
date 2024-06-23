import React, { useEffect, useState } from "react";
import "./Blogs.css"
import { InputGroup, Form, Button, Row, Col, Card } from "react-bootstrap";
import BlogCards from "./BlogCards";
import api from "../../api/axios"
import { getConfig } from "../../utils/jwtToken";
import FooterComp from "../FooterComp"
import PaginationComp from "../PaginationComp";


function Blogs(){
    const [blogsData, setBlogsData] = useState([]);
    const [blogDto , setBlogDto] = useState([]);
    const config = getConfig()
    const[page, setPage] = useState(0);
    const[size, setSize] = useState(12);


    const getBlogData = async(page, size) =>{
        try{
            const response = await api.get(`/api/v1/blogs?page=${page}&size=${size}`, config);
            setBlogDto(response.data)
            setBlogsData(response.data.list);
            
        }catch(err){
            console.log(err);
        }

    }
    
    
    useEffect(()=>{
        getBlogData(page, size);

    },[page, size]);


    return <>
        <div className="container-page">
            
            <InputGroup className="search-containe">
                <Form.Control
                placeholder="Search blog"
                aria-label="Search blog"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary btn-outline-success" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            
            <div className="container-blogs">
                
                <BlogCards blogs={blogsData}/>
                <PaginationComp dto={blogDto} setCurrentPage={setPage}/>

            </div>
            
        </div>

        <FooterComp/>
    </>
} 

export default Blogs;