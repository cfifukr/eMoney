import React from "react";
import "./Home.css"
import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../api/axios.js"
import Wallets from "./Wallets.js";
import ChartBar from "./ChartBar";
import { formatDate, addDays, subtractDays } from "../../utils/date.js";
import {getConfig, isJwtToken} from "../../utils/jwtToken.js"
import AddWalletForm from "./AddWalletForm.js";
import Goals from "./Goals.js";
import FooterComp from "../FooterComp.js"
import Currency from "./Currency.js";

function Home({user, setUser}){

    const [incomes, setIncomes] = useState({});
    const [expenses, setExpenses] = useState({});
    const [loadedStat, setLoadedStat] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    const checkToken = async () => {
        try {
            const tokenExists = await isJwtToken();
            setIsLogged(tokenExists);
        } catch (error) {
            console.error("Error checking JWT token:", error);
            setIsLogged(false); 
        }
    };

    const fetchData = async () => {
        const first = new Date();
        const second = new Date();

        const today = addDays(first, 1);
        const forteenDaysAgo = subtractDays(second, 13);
    

        const todayFormatted = formatDate(today);
        const anotherFormatted = formatDate(forteenDaysAgo);
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
        checkToken();
    }, []);


    return <>
    {isLogged ? 
        <div className="custom-container row ">
            <div className="col-xm-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 ">
                <div className="statistic-container">
                    {loadedStat ? (
                        <div>Loading chart...</div> 
                    ) : (
                        <ChartBar expenses={expenses} incomes = {incomes}/>
                    )}
                </div>
                <div className="statistic-container g-0">
                    <div className="poetsen-font text-center">
                        <h3 className="mb-3">Set goals to achieve them faster</h3>
                    </div>
                        <Goals/>
                </div>
            </div>
            

            
            <div className=" right-side-container-wrappe col-xm-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
            
                <div className="right-side-container">
                    <div className="poetsen-font">
                        <h3 className="px-3 text-center">Wallets</h3>
                    </div>
                    <Wallets wallets={user.wallets}/>

                    <AddWalletForm  setUser ={setUser} walletsSize={user.wallets?.length}/>
                </div>


                <div className="right-side-container">
                    <Currency/>
                </div>


            </div>

        </div>
        :
         <div style={{height:"80vh"}}>
                <Alert variant="danger" className="px-auto text-center" style={{margin:"4rem 4rem"}}>
                    <h2 className="reddit-bold-font">Firstly, you need to login</h2>
                </Alert>
            </div>
        }
        <FooterComp/>
        </>
    
}

export default Home;