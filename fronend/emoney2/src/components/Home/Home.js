import React from "react";
import "./Home.css"
import { useState, useEffect } from "react";
import api from "../../api/axios"
import Wallets from "./Wallets.js";
import ChartBar from "./ChartBar";
import { formatDate } from "../../utils/date.js";
import {getConfig} from "../../utils/jwtToken.js"
import AddWalletForm from "./AddWalletForm.js";

function Home({user, setUser}){

    const [incomes, setIncomes] = useState({});
    const [expenses, setExpenses] = useState({});
    const [loadedStat, setLoadedStat] = useState(true);

    const fetchData = async () => {
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        const todayFormatted = formatDate(today);
        const anotherFormatted = formatDate(oneMonthAgo);
        const period = `${todayFormatted}-${anotherFormatted}`;



        try {
            const responseExp = await api.get(`/api/v1/stat/expenses/${period}`, getConfig());
            const dataArrayExp = Object.entries(responseExp.data);
            const sortedDataExpArray = dataArrayExp.sort((a, b) => new Date(a[0]) - new Date(b[0]));
            const sortedDataExp = Object.fromEntries(sortedDataExpArray);


            const responseInc = await api.get(`/api/v1/stat/incomes/${period}`, getConfig());
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


    useEffect(() => {
        fetchData()
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
                <Wallets wallets={user.wallets}/>

                <AddWalletForm  setUser ={setUser} walletsSize={user.wallets?.length}/>
            </div>
        </div>
        </>
    
}

export default Home;