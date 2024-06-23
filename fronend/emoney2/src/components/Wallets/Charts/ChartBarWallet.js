import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { styled } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartBarWallet({ transactions }) {
    console.log(transactions);

    const getWeeklyData = (transactions) => {
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let incomeData = Array(7).fill(0);
        let expenseData = Array(7).fill(0);

        const today = new Date();
        const currentDayIndex = today.getDay();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const rotatedWeekDays = [
            ...weekDays.slice(currentDayIndex + 1),
            ...weekDays.slice(0, currentDayIndex + 1)
        ];

        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.createdTime);
            return transactionDate >= oneWeekAgo && transactionDate <= today;
        });

        filteredTransactions.forEach(transaction => {
            const day = new Date(transaction.createdTime).getDay();
            const rotatedDayIndex = (day + 7 - currentDayIndex - 1) % 7;
            if (transaction.operation === 'IN') {
                incomeData[rotatedDayIndex] += transaction.money;
            } else if (transaction.operation === 'OUT') {
                expenseData[rotatedDayIndex] += transaction.money;
            }
        });

        const netData = incomeData.map((income, index) => income - expenseData[index]);
        const barColors = netData.map(value => value >= 0 ? '#7be4ee' : '#a69bd9');

    

        const maxAbsValue = Math.max(...netData.map(Math.abs));

        return {
            labels: rotatedWeekDays,
            datasets: [
                {
                    
                    label: '',
                    data: netData.map((i) => Math.abs(i)),
                    backgroundColor: barColors,
                    borderColor: barColors.map(color => color.replace('0.6', '1')),
                    borderWidth: 1
                    
                },
                {
                    label: 'Net Income',
                    backgroundColor: "#7be4ee",


                }
            ],
            maxAbsValue: Math.ceil((maxAbsValue * 1.1) / 1000) * 1000, 
        };
    };

    const weeklyData = getWeeklyData(transactions);

    return (
        <div>
            <h3 className='reddit-bold-font' style={{ textAlign: "center" }}>
                Weekly transactions
            </h3>
            <Bar
                data={weeklyData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false,
                            text: 'Weekly Transactions',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: weeklyData.maxAbsValue,
                        },
                    },
                }}
            />
        </div>
    );
}

export default ChartBarWallet;
