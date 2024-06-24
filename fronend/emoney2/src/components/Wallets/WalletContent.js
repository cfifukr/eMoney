import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";
import { subtractDays } from "../../utils/date";
import Transactions from "./Transactions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./WalletsPage.css"
import ChartDoughnut from "./Charts/ChartDoughnut";
import ChartBarWallet from "./Charts/ChartBarWallet";
import StatWallet from "./StatWallet";

ChartJS.register(ArcElement, Tooltip, Legend);

function WalletContent({ selectedWalletId }) {
    const dateToday = new Date();
    const dateMonthAgo = subtractDays(dateToday, 30);
    const [walletDto, setWalletDto] = useState({});
    const [dateStart, setDateStart] = useState(dateToday.toISOString().split("T")[0]);
    const [dateEnd, setDateEnd] = useState(dateMonthAgo.toISOString().split("T")[0]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    

    const getStatWallet = async () => {
        if (selectedWalletId) {
            try {
                const response = await api.get(`api/v1/stat/wallets/${selectedWalletId}?dateStart=${dateStart}&dateEnd=${dateEnd}&size=${size}&page=${page}`, getConfig());
                console.log(response.data);
                setWalletDto(response.data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getStatWallet();
    }, [selectedWalletId, dateStart, dateEnd, page, size]);


   


    return (
        <>
            <div className=" row py-3 ps-2">
                <div className=" col-xm-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 
                    order-md-last order-sm-last order-xm-last
                    order-lg-first order-xl-first" style={{margin:"0 auto"}}>
                    <Transactions 
                        setWalletDto={setWalletDto}
                        transactionsDto={walletDto?.transactionsDto}
                        setCurrentPage={setPage}
                        walletId={walletDto?.walletDto?.id}/>

                    <div className="chart chart-bar">
                        <ChartBarWallet transactions={walletDto?.transactionsDto?.list || []}/>
                    </div>
                
                </div>

                <div className="col-xm-12 col-sm-12 col-md-12 col-lg-5 col-xl-5
                     order-md-first order-sm-first order-xm-first
                     order-lg-last order-xl-last"  style={{margin:"0rem auto"}} >

                    <div className="stat-container mb-3">
                        <StatWallet walletStatDto={walletDto}/>

                    </div>
                    <div className="chart chart-dough ">
                        <ChartDoughnut transactionsList={walletDto?.transactionsDto?.list}/>

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default WalletContent;
