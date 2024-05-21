import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Base.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Main/Main";


function Base(){
    
  
    const router = createBrowserRouter([
      {
          path:"/",
          element: <Main/>
      }
      
      
    ]);

    return<>
        <Navbar className= "navbar poetsen-font" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home" ><h3>eMoney</h3></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Statistic</Nav.Link>
          </Nav>
          
          <Nav className="d-flex">
          {false  ? 
            <><Nav.Link href="#features"><a className="btn btn-dark">Login</a></Nav.Link>
            <Nav.Link href="#pricing"><a className="btn btn-outline-dark">SignUp</a></Nav.Link></> 
            :
          <><Nav.Link href="#features"><a className="btn"><span className="user-name">Vladyslav</span></a></Nav.Link>
          <Nav.Link href="#pricing"><a className="btn btn-outline-dark">Log out</a></Nav.Link></>
          }
            
          </Nav>
        </Container>
      </Navbar>

        <Container style={{"margin-top": "1rem"}}>
            <RouterProvider router={router}/>
        </Container>
    </>
}

export default Base;