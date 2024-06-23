import React, { useState } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { PiNotePencilBold } from "react-icons/pi";
import "../Forms/ModalForms.css";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";

function AddCommentForm({blogId, commentsData, setCommentsData}) {
    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState("");
    const [text, setText] = useState("");
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
                `api/v1/blogs/${blogId}/comments`,
                { username: username, text: text},
                getConfig()
            );
            if (response?.data?.isException) {
                setError(response.data.body.errorDescription);
            } else {
                setCommentsData([response.data, ...commentsData])
                setShowForm(false);
                setUsername("");
                setText("");

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
                        <PiNotePencilBold  className="add-plus" /> Write Comment
                    </span>
            </a>

            <Modal show={showForm} onHide={handleCloseForm} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Write a comment</Modal.Title>
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
                        <Form.Group controlId="commentUsername">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="commentText">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                name="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            />
                        </Form.Group>
                       
                        <Button variant="primary" type="submit" className="mt-3 modal-button">
                            Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddCommentForm;
