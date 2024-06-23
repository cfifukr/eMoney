import React, { useEffect, useState } from "react";
import "./StatWallet.css";

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



    return<>
        <div className="balance-container reddit-bold-font">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                    alt="balance"
                    className="details-img"
                    />
                    <div>
                    <p className="details-text">Your Balance</p>
                    <p className="details-money" testid="balanceAmount">
                         {walletStatDto?.walletDto?.balance + " " + walletStatDto?.walletDto?.currency }
                    </p>
                    </div>
                </div>
                <div className="income-container reddit-bold-font">
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                    alt="income"
                    className="details-img"
                    />
                    <div>
                    <p className="details-text">Your Income</p>
                    <p className="details-money" testid="incomeAmount">
                        {totalIncome +  " " + walletStatDto?.walletDto?.currency }
                    </p>
                    </div>
                </div>
                <div className="expenses-container reddit-bold-font">
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                    alt="expenses"
                    className="details-img"
                    />
                    <div>
                    <p className="details-text">Your Expenses</p>
                    <p className="details-money" testid="expensesAmount">
                         {totalExpenses +  " " + walletStatDto?.walletDto?.currency }
                    </p>
                    </div>
                </div>
    </>
}

export default StatWallet;