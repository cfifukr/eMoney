import React, {useState} from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import "./Transaction.css"
import PaginationComp from "../PaginationComp";
import AddTransactionForm from "./AddTransactionForm";

function Transactions({walletId, transactionsDto, setCurrentPage, setWalletDto}){
    const[showForm, setShowForm] = useState(false);

    const paginationStyle = {
        background: "#bee179",
        border: "1px solid #84cc16",
        color: "#F3F4F6"
    };
    

    return <>
        <AddTransactionForm setShowForm={setShowForm} showForm={showForm} walletId={walletId} setWalletDto={setWalletDto}/>

        <div className="transactions-container text-center">
            {
                transactionsDto?.list.length > 0 ? 
                    <h3 className=" mt-3 reddit-bold-font">Transactions within month</h3>
                    :
                    <h3 className=" mt-3 reddit-bold-font">No transactions</h3>

            }
            <ListGroup as="ol"  className="transactions" >
                {transactionsDto?.list?.map((transaction) => <ListGroup.Item  key={transaction.id} as="li" className="transaction-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto reddit-bold-font transaction-text text-start ">
                            {(transaction.operation === "IN" ? "" : "-" ) + transaction?.money}
                            <span className="reddit-regular-font px-1">{transaction?.description}</span>


                            
                        </div>
                        <Badge className="custom-badge" pill> {transaction?.createdTime.split("T")[0]} </Badge>
                    </ListGroup.Item>
                )}
                <ListGroup.Item  as="li"
                     className="transaction-item-add d-flex justify-content-between" 
                        onClick={() => setShowForm(true)}
                        >
                    <span className="reddit-semibold-font add-transaction-item">
                         Add Transaction
                    </span>
                        
                </ListGroup.Item>
            </ListGroup>
            {transactionsDto ?
            <div style={{marginLeft:"5%"}}>
                <PaginationComp dto = {transactionsDto} setCurrentPage={setCurrentPage} paginationStyle={paginationStyle}/> 
            </div> : ""
            }
        </div>
        
    </>
}

export default Transactions;