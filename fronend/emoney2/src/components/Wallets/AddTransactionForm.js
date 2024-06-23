import React, { useState } from "react";
import api from "../../api/axios";
import { Modal, Alert, Form, Button } from "react-bootstrap";
import "../Forms/ModalForms.css"
import { getConfig } from "../../utils/jwtToken";



function AddTransactionForm({walletId,  showForm, setShowForm, setWalletDto}) {
    const [money, setMoney] = useState("");
    const [description, setDescription ] = useState("");
    const [operation, setOperation] = useState("")
    const [error, setError] = useState("");

    

    const handleCloseForm = () => setShowForm(false);

    const addTransaction = (newTransaction) => {
        setWalletDto((prevDto) => {
            const updatedTransactionsList = [...prevDto.transactionsDto.list, newTransaction];
            const updatedTotal = prevDto.transactionsDto.total + 1;
            const updatedNumberTransactions = prevDto.walletDto.numberTransactions + 1;
            const updatedBalance = newTransaction.operation === "IN"
                ? prevDto.walletDto.balance + newTransaction.money
                : prevDto.walletDto.balance - newTransaction.money;

            return {
                ...prevDto,
                walletDto: {
                    ...prevDto.walletDto,
                    balance: updatedBalance,
                    numberTransactions: updatedNumberTransactions
                },
                transactionsDto: {
                    ...prevDto.transactionsDto,
                    total: updatedTotal,
                    list: updatedTransactionsList
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                `api/v1/transactions/${walletId}`,
                { money: money, operation: operation, description: description},
                getConfig()
            );
            if (response?.data?.isException) {
                setError(response.data.body.errorDescription);
            } else {
                console.log(response.data)
                addTransaction(response.data);
                setShowForm(false);
                setDescription("");
                setOperation("");
                setMoney(0.00)

            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.errorDescription || 'An error occurred');
        }
    };

    return (
        <>  
            
            <Modal show={showForm} onHide={handleCloseForm} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
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
                        <Form.Group controlId="transactionMoney">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="money"
                                value={money}
                                onChange={(e) => setMoney(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="transactionOperation">
                            <Form.Label>Operation</Form.Label>
                            <Form.Control
                                as="select"
                                name="operation"
                                value={operation}
                                onChange={(e) => setOperation(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="IN">Income</option>
                                <option value="OUT">Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="transactionDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                       
                        <Button variant="primary" type="submit" className="mt-3 modal-button">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default AddTransactionForm;