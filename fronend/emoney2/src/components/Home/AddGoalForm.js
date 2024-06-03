import React, { useState } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { CiSquarePlus } from "react-icons/ci";
import "./Home.css";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";

function AddGoalForm({ goalsDto, setGoalsDto, set }) {
    const [showForm, setShowForm] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goalMoney, setGoalMoney] = useState("");
    const [goalCurr, setGoalCurr] = useState("");
    const [error, setError] = useState("");

    const handleShowForm = () => {
        setShowForm(true);
        setError("");
    };

    const handleCloseForm = () => setShowForm(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "api/v1/goals",
                { goal: goalName, money: goalMoney, currency: goalCurr },
                getConfig()
            );
            if (response?.data?.isException) {
                setError(response.data.body.errorDescription);
            } else {
                setGoalsDto((goalsDto) => ({
                    ...goalsDto,
                    list: [...goalsDto.list, response.data]
                }));
                setShowForm(false);
                setGoalName("");
                setGoalMoney(0.00);
                setGoalCurr("");

            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.errorDescription || 'An error occurred');
        }
    };

    return (
        <>  
            <a onClick={handleShowForm} className="mt-3 add-text">
                    <span>
                        <CiSquarePlus className="add-plus" /> Add Goal
                    </span>
            </a>

            <Modal show={showForm} onHide={handleCloseForm} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Goal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error && (
                        <Alert className="input-group-error" variant="danger" dismissible>
                            <Alert.Heading>
                                <span className="error-text">{error}</span>
                            </Alert.Heading>
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="goalName">
                            <Form.Label>Goal Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="goalMoney">
                            <Form.Label>Goal Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="money"
                                value={goalMoney}
                                onChange={(e) => setGoalMoney(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="goalCurrency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                as="select"
                                value={goalCurr}
                                onChange={(e) => setGoalCurr(e.target.value)}
                                required
                            >
                                <option value="">Select currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 modal-button">
                            Create Goal
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddGoalForm;
