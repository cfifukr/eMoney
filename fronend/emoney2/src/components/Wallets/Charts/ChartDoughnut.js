import React from "react";
import { Doughnut } from "react-chartjs-2";

function ChartDoughnut({transactionsList}){

     const calculateTotals = (transactions) => {
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(transaction => {
            if (transaction.operation === 'IN') {
                totalIncome += transaction.money;
            } else if (transaction.operation === 'OUT') {
                totalExpenses += transaction.money;
            }
        });

        if (totalIncome === 0 && totalExpenses === 0) {
            totalIncome = 1;
            totalExpenses = 1;
        }

        return [totalIncome, totalExpenses];
    };


    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: ' - money',
                data: calculateTotals(transactionsList || []),
                backgroundColor: [
                    '#7be4ee',
                    '#a69bd9',
                ],
                borderColor: [
                    '#06b6d4',
                    '#7c3aed',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <>
        <Doughnut data={data} />

    </>
}

export default ChartDoughnut;