import React, { useState } from "react";
import { ListGroup, Badge, Form, InputGroup, Button } from "react-bootstrap";
import "./Goals.css"
import ProgressBar from "./ProgressBar";
import api from "../../api/axios"
import { getConfig } from "../../utils/jwtToken";

function Goal({goal, goalsDto,  setGoalsDto}){

    const [money, setMoney] = useState(0);

    const updateGoalDto = (updatedGoal) => {
        const updatedList = goalsDto.list.map(goal => 
          goal.id === updatedGoal.id ? { ...goal, moneyHave: updatedGoal.moneyHave } : goal
        );
        setGoalsDto({ ...goalsDto, list: updatedList });
      };

    const updateGoal = async() =>{
        try{
            const response = await api.put(`/api/v1/goals`,
                 {"money": money, "id" : goal.id},
                  getConfig());
            updateGoalDto(response.data);
            setMoney(0);
            

        }catch(err){
            console.log(err)
        }

    }

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

                    
                    <div className="row">
                        <Form className="add-money" onSubmit={()=>updateGoal()}>
                            <div className="col-xm-12 col-sm-12 col-md-5 col-lg-4">
                                <InputGroup >
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Money add"
                                        aria-label="Money add"
                                        aria-describedby="basic-addon2"
                                        type="number"
                                        value={money}
                                        onChange={(e) => setMoney(e.target.value)}
                                        required
                                        
                                        
                                        />
                                        <Button
                                            variant="outline-secondary" 
                                            className="btn"
                                            type="submit">
                                            Add
                                        </Button>
                                    
                                </InputGroup>
                            </div>
                            
                            

        
                        </Form>

                    </div>
                    
                    
            



            </div>
            
            
            
        </ListGroup.Item>


    </>
}

export default Goal;