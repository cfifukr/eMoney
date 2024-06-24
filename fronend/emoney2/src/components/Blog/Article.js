import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/axios"
import { getConfig, isJwtToken } from "../../utils/jwtToken";
import FooterComp from "../FooterComp";
import { Row, Col, Alert } from "react-bootstrap";
import Header from "./components_article/Header"
import Text from "./components_article/Text"
import Image from "./components_article/Image"
import "./Article.css"
import Comments from "./Comments";


function Article(){
    const {id} = useParams();
    const [blog, setBlog] = useState({"components" : []});
    const [plan , setPlan] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
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



    let counter = 0;    
    const getBlog = async(blog_id) =>{
        try{
            const response = await api.get(`api/v1/blogs/${blog_id}`, getConfig());
            const planArray = response.data.components.filter((comp) => comp.type.toUpperCase() === "HEADER");
            setPlan(planArray);
            setBlog(response.data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getBlog(id);
        checkToken();
    },[]);


    return <>
        { isLogged ? <div className="container-page" style={{marginBottom:"1rem", minHeight: "80vh"}}>
            <div className="banner">
                <img src="https://t3.ftcdn.net/jpg/05/36/62/62/360_F_536626246_O8ndHiA0gT5uGz1F9HaJXA1Jq9gmH0S6.jpg" alt="Banner Image"/>
            </div>
            <Row className="justify-content-center">
                <Col sm ={10} md ={9} lg={8}>
                    <div className="reddit-black-font mx-5 mb-4 article-title">

                        <h2>{blog.title}</h2>
                    </div>
                    <div className="reddit-bold-font mx-5">
                        Last update date : {blog.lastModificationDate?.split("T")[0]}
                    </div>

                    <div className="reddit-semibold-font plan-article">
                        <h3 className="reddit-bold-fontpx-5">{blog.title}</h3>
                        {plan.map((i) =>{
                            counter++;
                            return <h4 key ={counter}>{ counter + ". " + i.data}</h4>
                        })}
                    </div>

                    <div className="content">
                        {blog?.components?.map((i) =>{
                            return <>
                                {i.type.toUpperCase() ==="HEADER" ? <Header component={i}/> : ""}
                                {i.type.toUpperCase() ==="IMAGE" ? <div className="image-container"><Image  component={i}/></div> : ""}
                                {i.type.toUpperCase() ==="TEXT" ? <Text component={i}/> : ""}

                            </>

                        })}
                        
                    </div>
                
                
                </Col>
                

                
            

            </Row>

            <div className="underline"></div>
            <Comments blogId={id} currentPage={currentPage} setCurrentPage={setCurrentPage} setTotalPages={setTotalPages}/>
            {currentPage + 1 < totalPages ? (
                    <button type="button" onClick={() => {setCurrentPage(currentPage + 1)}} class="more-button">Show more</button>
            ) : ""}
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

export default Article;