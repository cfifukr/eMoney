import React, { useEffect, useState } from "react";
import "./Currency.css"
import { Row, Col, ListGroup } from "react-bootstrap";


function Currency(){
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    const date = new Date();
    const [currencies, setCurrencies] = useState([]);

    const getCurrencies = async() =>{
        const response = await fetch(url)
        .then(res => res.json())
        .then((data)=>{
            let array = [];

            const baseCurr=["USD", "EUR", "GBP", "CHF", "PLN", "TRY"];
            
            for(let cur of data){
                if(baseCurr.includes(cur.cc)){

                    array.push(cur);
                }
            }

            setCurrencies(array || []);
        }
        );
        

    };

    useEffect(()=>{
        getCurrencies();
    },[])

    
    
    
    return <>
        <h2 className="poetsen-font" style={{textAlign:"center"}}>
            Currencies
        </h2>

        <ListGroup className = "currencies-list">

        {currencies.map((curr)=> <ListGroup.Item 
                key={curr.txt} 
                xm={6} sm={6} md={6} lg={6} xl={6} 
                className="currency-item">
                    <Row className="reddit-semi-font">
                        <Col xm={9} sm={9} md={9} lg={9} xl={9}>
                            <div className="curr">
                                <span className="reddit-semibold-font"> {curr.cc}
                                    <span className="reddit-regular-font"> {curr.txt}</span>
                                </span>

                            </div>
                            
                        </Col>
                        <Col xm={3} sm={3} md={3} lg={3} xl={3} className="justify-content-end text-end">
                            <span className="reddit-bold-font rate">  {curr.rate.toFixed(2)} </span>

                        </Col>

                    </Row>

                </ListGroup.Item>
        )}
        </ListGroup>
           
    </>
}

export default Currency;