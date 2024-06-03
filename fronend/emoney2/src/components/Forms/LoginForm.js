import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Forms.css"
import { Row, Col, InputGroup, Form, Button, Alert } from "react-bootstrap";
import api from "../../api/axios"
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getConfig } from "../../utils/jwtToken";
import FooterComp from "../FooterComp.js"




function LoginForm({setUser}){
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await api.post('http://localhost:8080/api/v1/login', {"username":username, "password": password})
            console.log(response);
            if(response.data.isException || !response.data.token){
                setError(response?.data?.errorDescription);
            }else{
                const token = response?.data?.token;
                localStorage.setItem('jwtToken', token);
                getUserFromToken(getConfig()).then((data) => setUser(data));
                navigate("/");
                
            }
            
            
            
        }catch(error){
            setError(error.response.data.message || 'An error occurred. Try later');
        }
    }
 


    return <>
        <Row className="justify-content-md-center">
            <Col xs={12} md={10} lg={7}>
                <Form onSubmit={handleSubmit}>
                    <Container className="custom-form">
                        <h3 className="poetsen-font text-center">LOGIN</h3>

                        {(!!error ?
                            <Alert  className ="input-group-error" variant="danger" dismissible>
                                <Alert.Heading><span className="error-text">{error}</span></Alert.Heading>
                            </Alert> :
                            <></>
                        )}
                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            id="username"
                            onChange={(data)=>setUsername(data.target.value)}

                            />
                            
                        </InputGroup>

                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            id="password"
                            onChange={(data)=>setPassword(data.target.value)}
                            type="password"
                            />
                            
                        </InputGroup>
                        
                        <div className="input-group">
                            <Button type="submit" className ="input-button">LOGIN</Button>
                        </div>


                    </Container>
                </Form>
            </Col>
        
                    
        </Row>
        <div className="footer-container">
            <FooterComp/>
        </div>

    
    </>
}

export default LoginForm;