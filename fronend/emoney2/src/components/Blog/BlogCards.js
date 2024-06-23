import React from "react";
import { Col, Row,  Card } from "react-bootstrap";
import imgDefaultBlog from "../../static/default-blog-card-image.jpg"
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router";


function BlogCards({blogs}){
    const navigate = useNavigate();

    const redirectToBlog = (blog_id) =>{
        navigate(`/blogs/${blog_id}`)
    }
    
    return <>
            <Row>
                {blogs.map((blog) => {   
                    return (
                        <Col key={blog.id} sm={12} md={6} lg={4} xl={3} className="px-2" >
                            <Card className="blog-card" onClick={() => redirectToBlog(blog.id)}>
                            <Card.Img 
                                className="image" 
                                variant="top" 
                                src={blog.image_link || imgDefaultBlog}
                                onError={(e) => {e.target.src = imgDefaultBlog}} 
                            />
                                <Card.Body>
                                    <Card.Title className="title">{blog.title}</Card.Title>
                                    <Card.Text className="description">
                                        {blog.description ? blog.description : "No description"}
                                    </Card.Text>
                                    <div className="author">
                                        <FaUserAlt/> {blog.username}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )   
                })}
            </Row>

        </>
}

export default BlogCards;
