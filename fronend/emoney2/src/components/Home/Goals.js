import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";
import Goal from "./Goal";
import "./Goals.css";
import { ListGroup, Pagination, Col, Row } from "react-bootstrap";
import AddGoalForm from "./AddGoalForm";

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
    useEffect(() => {
        renderPaginationItems();
    }, [goalsDto]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

    const renderPaginationItems = () => {
        let items = [];
        const totalPages = goalsDto.totalPage;
        const currentPage = goalsDto.currentPage;
        const deltaBefore = 1;
        const deltaAfter = 2;
    
        if (currentPage <= deltaBefore + 2) {
            for (let number = 1; number <= Math.min(totalPages, currentPage + deltaAfter); number++) {
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            if (totalPages > currentPage + deltaAfter) {
                items.push(<Pagination.Ellipsis key="ellipsis-1" linkStyle={{background: "#A79B94",
                    border:"1px solid #786960",
                    color:"#F3F4F6"}} 
                />);
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={totalPages}
                        active={currentPage === totalPages}
                        onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            }
        } else {
            items.push(
                <Pagination.Item
                    linkStyle={{background: "#A79B94",
                        border:"1px solid #786960",
                        color:"#F3F4F6"
                    }}
                    className="reddit-regular-font page"
                    key={1}
                    active={currentPage === 1}
                    onClick={() => handlePageClick(1)}>
                    1
                </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="ellipsis-2" linkStyle={{background: "#A79B94",
                border:"1px solid #786960",
                color:"#F3F4F6"}} 
                />);
            for (let number = Math.max(1, currentPage - deltaBefore); number <= Math.min(totalPages, currentPage + deltaAfter); number++) {
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            if (currentPage + deltaAfter < totalPages) {
                items.push(<Pagination.Ellipsis key="ellipsis-3" linkStyle={{background: "#A79B94",
                border:"1px solid #786960",
                color:"#F3F4F6"}} 
            />);                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={totalPages}
                        active={currentPage === totalPages}
                        onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            }
        }
        return items;
    };
    
    

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
                        <Pagination className="goals-pages">{renderPaginationItems()}</Pagination>

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
