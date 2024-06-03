import React from "react";
import { ListGroup, Badge, Row, Col } from "react-bootstrap";
import "./Goals.css"
import ProgressBar from "./ProgressBar";

function Goal({goal}){

    return <>
        <ListGroup.Item as="ol" className="goal-item justify-content-between align-items-start">
                <div className="row m-1">
                    <div className="fw-bold col-9">
                        {<p className="reddit-regular-font goal-name">{goal?.goal}</p>}
                    </div>
                    <div className="col-3 badge-container">
                        <Badge className="custom-badge" pill> { goal?.moneyNeed  + " " + goal?.currency} </Badge>

                    </div>

                    <div className="row">
                        <div className="progress-bar ms-2 col-10">
                            <ProgressBar goal={goal}/>
                        </div>
                        <div className="col">
                            
                        </div>
                    </div>
                    
            



            </div>
            
            
            
        </ListGroup.Item>


    </>
}

export default Goal;