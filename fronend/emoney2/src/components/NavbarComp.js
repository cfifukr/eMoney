import React from "react";
import { FaUser } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";
import { deleteJwtToken } from "../utils/jwtToken";
import "../App.css"
function NavbarComp({user, setUser}){


    const handleLogout = () =>{
        deleteJwtToken();
        setUser({})
    }
    
    return <>
            <Navbar className= "navbar poetsen-font bg-light" data-bs-theme="light">
                <Container>
                <Navbar.Brand href="/" ><h3>eMoney</h3></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className="my-auto" href="/home">Home</Nav.Link>
                    <Nav.Link className="my-auto" href="/wallets">Wallets</Nav.Link>
                    <Nav.Link  className="my-auto"href="/blogs">Blogs</Nav.Link>
                    <Nav.Link  className="my-auto"href="/add_blog">Write Blog</Nav.Link>
                </Nav>
                
                <Nav className="d-flex justify-content-center">
                    
                {!user.username  ? 
                    <><Nav.Link href="/login"><a className="btn btn-dark" ><span>Login</span></a></Nav.Link>
                    <Nav.Link href="/signup"><a className="btn btn-outline-dark"><span>SignUp</span></a></Nav.Link></> 
                    :
                    <><Nav.Link href="#features"><a className="btn"><FaUser/><span className="user-name">{user.name}</span></a></Nav.Link>
                    <Nav.Link href="/"><a onClick={handleLogout} className="btn btn-outline-dark"><span>Log out</span></a></Nav.Link></>
                
                }
                    
                </Nav>
                </Container>
            </Navbar>
    </>
}

export default NavbarComp;