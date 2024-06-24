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
        ready() {
            window.addEventListener('resize', this.reload);
            this.loadChart();
        },
    
        methods: {
            loadChart() {
                console.log('loading..');
    
                new ChartDoughnut(
                    this.$el.getContext('2d'),
                    {
                        type: this.type,
                        data: this.data,
                        options: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ); 
            },
    
            reload() {
                window.clearTimeout(this.timeoutHandle);
    
                this.timeoutHandle = window.setTimeout(
                    this.loadChart(),
                3);
            }
        }
    };


    return <>
        <Doughnut data={data} />

   
        

    </>
}

export default ChartDoughnut;