import React, { useEffect, useState } from "react";
import "./StatWallet.css";
import { Row, Col } from "react-bootstrap";

function StatWallet({walletStatDto}){

    const [totalIncome, setTotalIncome] = useState(0);
    const[totalExpenses, setTotalExpenses] = useState(0);


    const getTotalStat = (transactions) =>{ 
        let income = 0;
        let expenses = 0;
        for(let trans of transactions){
            if(trans.operation == "IN"){
                income +=trans.money;
            }
            if(trans.operation == "OUT"){
                expenses +=trans.money;
            }
            
        }
        return [income, expenses];
    }

    useEffect(()=>{
        const result = getTotalStat(walletStatDto?.transactionsDto?.list || []);
        setTotalIncome(result[0]);
        setTotalExpenses(result[1]);


    },[walletStatDto]);



    return<Row>
        <Col xm = {4}  sm= {4} md = {4} lg = {12}  xl = {12} className="px-1 pl-0">
            <div className="balance-container reddit-bold-font">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                    alt="balance"
                    className="details-img"
                />
                <div>
                    <p className="details-text">Balance</p>
                    <p className="details-money" testid="balanceAmount">
                            {walletStatDto?.walletDto?.balance.toFixed(0) + " " + walletStatDto?.walletDto?.currency }
                    </p>
                </div>
            </div>
        </Col>
        <Col xm = {4}  sm= {4} md = {4} lg = {12}  xl = {12} className="px-1">
            <div className="income-container reddit-bold-font">
                <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="details-img"
                />
                <div>
                <p className="details-text">Income</p>
                <p className="details-money" testid="incomeAmount">
                    {totalIncome.toFixed(0) + " " + walletStatDto?.walletDto?.currency }
                </p>
                </div>
            </div>
        </Col>
        <Col xm = {4}  sm= {4} md = {4} lg = {12}  xl = {12} className="px-1 pr-0">
        
        
            <div className="expenses-container reddit-bold-font">
                <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="details-img"
                />
                <div>
                <p className="details-text">Expenses</p>
                <p className="details-money" testid="expensesAmount">
                        {totalExpenses.toFixed(0) + " " + walletStatDto?.walletDto?.currency }
                </p>
                </div>
            </div>       
        </Col>


    </Row>
        
}

export default StatWallet;