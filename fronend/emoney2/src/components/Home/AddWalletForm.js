import React from "react";
import { getConfig } from "../../utils/jwtToken";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import "../Forms/ModalForms.css";
import api from "../../api/axios"

function AddWalletForm({walletsSize, setUser}){
    const [showForm, setShowForm] = useState(false);
    const [walletName, setWalletName] = useState("");
    const [walletCurr, setWalletCurr] = useState("");
    const [error, setError] = useState('');


    const handleShowForm = () => {
        setShowForm(true)
        setError("")
    };
    const handleCloseForm = () => setShowForm(false);
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await api.post("api/v1/wallets", {"name":walletName, "currency": walletCurr}, getConfig());
            if(response?.data?.body?.isException){
                setError(response.data.body.errorDescription)
            }else{
                setUser(response.data);
                setShowForm(false);
            }
        }catch(error){
            setError(error.response.data.errorDescription || 'An error occurred');
        }
    };

    return<>    
            { walletsSize >=5 ? <></> : <>
                <a onClick={handleShowForm} className="mt-3 add-text"><span ><CiSquarePlus className="add-plus"/> Add wallet </span></a>
                </>
            }


                <Modal show={showForm} onHide={handleCloseForm} className="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Wallet</Modal.Title>
                    </Modal.Header>


                    
                    <Modal.Body>
                    {(!!error ?
                            <Alert  className ="input-group-error" variant="danger" dismissible>
                                <Alert.Heading><span className="error-text">{error}</span></Alert.Heading>
                            </Alert> :
                            <></>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="walletName">
                                <Form.Label>Wallet Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={walletName}
                                    onChange={(e)=> setWalletName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCurrency">
                                <Form.Label>Currency</Form.Label>
                                <Form.Control
                                as="select"
                                value={walletCurr}
                                onChange={(e)=> setWalletCurr(e.target.value)}
                                required
                                >
                                <option value="">Select currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">UAH</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3 modal-button">
                                Create Wallet
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
}

export default AddWalletForm;