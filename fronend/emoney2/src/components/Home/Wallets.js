import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import "./Home.css"


function Wallets({wallets}){


    return<>
        <ListGroup as="ol" numbered className="wallets">
            {wallets?.map((wallet) => <ListGroup.Item  key={wallet.id} as="li" className="wallet-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold wallet-name">{wallet?.name}</div>

                        Balance : {wallet?.balance}
                    </div>
                    <Badge className="custom-badge" pill> {wallet?.currency} </Badge>
                </ListGroup.Item>
            )}
        </ListGroup>
    </>
}


export default Wallets;