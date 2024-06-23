import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Forms.css"
import { Row, Col, InputGroup, Form, Button, Alert } from "react-bootstrap";
import FooterComp from "../FooterComp.js"
import api from "../../api/axios.js"
import { getConfig } from "../../utils/jwtToken.js";
import { useNavigate } from "react-router";

function BlogForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const [components, setComponents] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState('');
    const [componentData, setComponentData] = useState('');
    const [error, setError] = useState('');

    const handleAddComponent = () => {
        if (selectedComponent && componentData) {
            setComponents(prevComponents => [...prevComponents, { type: selectedComponent, data: componentData }]);
            setSelectedComponent('');
            setComponentData('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                title: title,
                username: username,
                image_link: imageLink,
                description: description,
                components:components
            };
            const response = api.post("api/v1/blogs",blogData, getConfig())
            console.log(response.data);
            navigate("/blogs")
            
        } catch (error) {
            setError(error.response.data.message || 'An error occurred. Try later');
        }
    }

    return <>
        <Row className="justify-content-md-center">
            <Col xs={12} md={10} lg={7}>
                <Form onSubmit={handleSubmit}>
                <Container className="custom-form">
                        <h3 className="poetsen-font text-center">Create Blog</h3>
                        {(!!error ?
                            <Alert className="input-group-error" variant="danger" dismissible>
                                <Alert.Heading><span className="error-text">{error}</span></Alert.Heading>
                            </Alert> :
                            <></>
                        )}
                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                                placeholder="Title"
                                maxLength="50"
                                aria-label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                                placeholder="Username"
                                maxLength="50"
                                aria-label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                                placeholder="Image Link"
                                aria-label="Image Link"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                                as="textarea"
                                maxLength="750"
                                rows={3}
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </InputGroup>


                        <InputGroup className="input-group mb-3">
                                <Form.Control
                                    as="select"
                                    value={selectedComponent}
                                    onChange={(e) => setSelectedComponent(e.target.value)}>
                                    <option value="">Select Component</option>
                                    <option value="HEADER">Header</option>
                                    <option value="TEXT">Text</option>
                                    <option value="IMAGE">Image</option>
                                </Form.Control>
                                <Button variant="outline-secondary component-add-button" onClick={handleAddComponent}>Add Component</Button>

                        </InputGroup>

                        <InputGroup className="input-group mb-3">
                            <Form.Control
                                    placeholder="Component Data"
                                    
                                    as="textarea"
                                    value={componentData}
                                    onChange={(e) => setComponentData(e.target.value)}
                                />
                        </InputGroup>
                        
                        

                        <div className="input-group">
                            <Button type="submit" className="input-button">Create Blog</Button>
                        </div>

                    </Container>
                </Form>
            </Col>
        </Row>
        <FooterComp />

    </>
}

export default BlogForm;
