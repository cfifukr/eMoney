import React from "react";
import { useState, useEffect } from "react";
import "../Base.css"
import "./Main.css"
import api from "../../api/axios"
import Wallets from "./Wallets";
import ChartBar from "./ChartBar";

function Main(){
    const[user, setUser] = useState({});
    const[expenses, setExpenses] = useState({});
    const[incomes, setIncomes] = useState({});
    const [loadedStat, setLoadedStat] = useState(true);


    const jwtToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJvbmUiLCJpYXQiOjE3MTYxNDc2ODQsImV4cCI6MTcxNjIzNDA4NCwicm9sZXMiOiJST0xFX0FETUlOLCAifQ.3d4jynZJJV4h4vBqj96B5qcMlMYFHSz9bRLyRCic08GVBU-HTytGKQCch3Yvwwob';

    const config = {
        headers: {
        'Authorization': `Bearer ${jwtToken}`
    }
    };
    
    const getExpenses = async () => {
        try {
            const responseExp = await api.get("/api/v1/stat/expenses/2024_04_21-2024_05_21", config);
            const dataArrayExp = Object.entries(responseExp.data);
            const sortedDataExpArray = dataArrayExp.sort((a, b) => new Date(a[0]) - new Date(b[0]));
            const sortedDataExp = Object.fromEntries(sortedDataExpArray);


            const responseInc = await api.get("/api/v1/stat/incomes/2024_04_21-2024_05_21", config);
            const dataArrayInc = Object.entries(responseInc.data);
            const sortedDataIncArray = dataArrayInc.sort((a, b) => new Date(a[0]) - new Date(b[0]));
            const sortedDataInc = Object.fromEntries(sortedDataIncArray);

            setIncomes(sortedDataInc)
            setExpenses(sortedDataExp);
            setLoadedStat(false); 
        } catch (err) {
            console.log(err);
        }
    };

    const getUser = async () => {
        try {
            const response = await api.get("/api/v1/user", config);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getExpenses();
        getUser();
    }, []);

    return <>
    
        <div className="custom-container row">
            <div className="statistic-container col-7 ">
                {loadedStat ? (
                    <div>Loading chart...</div> 
                ) : (
                    <ChartBar expenses={expenses} incomes = {incomes}/>
                )}
            </div>

            <div className="wallets-container col">
                <div className="poetsen-font">
                    <h3 className="px-3">Wallets</h3>
                </div>
                <Wallets wallets={user.wallets} />
            </div>
        </div>
        </>
    
}

export default Main;