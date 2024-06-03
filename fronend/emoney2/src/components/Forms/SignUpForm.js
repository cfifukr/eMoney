import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Forms.css"
import { Row, Col, InputGroup, Form, Button, Alert } from "react-bootstrap";
import api from "../../api/axios"
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getConfig } from "../../utils/jwtToken";
import FooterComp from "../FooterComp";


function SignUpForm({setUser}){
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[passwordRepeat, setPasswordRepeat] = useState('');
    const[name, setName] = useState('');
    const[error, setError] = useState('');


    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(password !== passwordRepeat){
            setError("Passwords didn`t match")
        }else{
            try{
        
                const response = await api.post('http://localhost:8080/api/v1/signup',
                 {"username": username, "name": name, "password": password})
                
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                getUserFromToken(getConfig())
                    .then((data) => setUser(data));
                navigate("/")
            }catch(error){
                setError(error.response.data.message || 'An error occurred');
            }


        }
        
    }
 


    return <>
        <Row className="justify-content-md-center">
            <Col xs={12} md={10} lg={7}>
                <Form onSubmit={handleSubmit}>
                    <Container className="custom-form">
                        <h3 className="poetsen-font text-center">REGISTRATION</h3>

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
                            required

                            />
                            
                        </InputGroup>

                        <InputGroup className=" input-group mb-3">
                            <Form.Control
                            placeholder="Your name"
                            aria-label="Your name"
                            id="name"
                            onChange={(data)=>setName(data.target.value)}
                            required
                            />
                            
                        </InputGroup>

                        <InputGroup className="input-group mb-3">
                            <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            id="password"
                            type="password"
                            onChange={(data)=>setPassword(data.target.value)}
                            required

                            />
                            
                        </InputGroup>

                        <InputGroup className="input-group mb-3">
                            <Form.Control
                            placeholder="Repeat password"
                            aria-label="Repeat password"
                            id="passwordRepeat"
                            type="password"
                            onChange={(data)=>setPasswordRepeat(data.target.value)}
                            required
                            />
                            
                        </InputGroup>
                        
                        <div className="input-group">
                            <Button type="submit" className ="input-button">SUBMIT</Button>
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

export default SignUpForm;