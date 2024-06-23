import React, { useEffect, useState } from "react";
import "./Currency.css"
import { Row, Col } from "react-bootstrap";


function Currency(){
    const date = new Date();
    const [currencies, setCurrencies] = useState([]);

    const getCurrencies = async() =>{
        const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
        console.log(response.json().status)

    };

    useEffect(()=>{

    },[])

    
    
    
    return <>
        <h2 className="poetsen-font" style={{textAlign:"center"}}>
            Currency rates
        </h2>
            <Row>
                <Col className="currencies-nbu">
                    {currencies}
                    
                </Col>

                <Col className="crypto-currencies">
                </Col>
            </Row>
    </>
}

export default Currency;