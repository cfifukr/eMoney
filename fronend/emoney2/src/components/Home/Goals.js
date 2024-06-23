import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";
import Goal from "./Goal";
import "./Goals.css";
import { ListGroup, Pagination, Col, Row } from "react-bootstrap";
import AddGoalForm from "./AddGoalForm";
import PaginationComp from "../PaginationComp";

function Goals() {
    const [goalsDto, setGoalsDto] = useState({ list: [], totalPage: 0 });
    const [currentPage, setCurrentPage] = useState(0);

    const config = getConfig();

    const getGoals = async (page) => {
        try {
            const response = await api.get(`/api/v1/goals?size=5&page=${page}`, config);
            setGoalsDto(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getGoals(currentPage);
    }, [currentPage]);
    
    

    return (
        <>
            <ListGroup as="ol" className="goals">
                {goalsDto.list.map((goal) => (
                    <Goal key={goal.id} goal={goal} />
                ))}
            </ListGroup>
            <div className="pagination-container">
                <Row>
                    <Col sm lg md = {9}>
                            <PaginationComp dto={goalsDto} setCurrentPage={setCurrentPage}/>
                    </Col>
                    <Col className="text-end" sm lg md = {3}>
                        <AddGoalForm  goalsDto={goalsDto} setGoalsDto={setGoalsDto}/>
                    </Col>


                </Row>
                
            </div>
            
        </>
    );
}

export default Goals;
