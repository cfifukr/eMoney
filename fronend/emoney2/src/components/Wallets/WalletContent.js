import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getConfig } from "../../utils/jwtToken";
import { subtractDays } from "../../utils/date";
import Transactions from "./Transactions";
import { Col, Row } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
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

            <Row className="py-3 ps-2">
                <Col sm={12} md={6} lg={7} xl={7} >
                    <Transactions 
                        setWalletDto={setWalletDto}
                        transactionsDto={walletDto?.transactionsDto}
                        setCurrentPage={setPage}
                        walletId={walletDto?.walletDto?.id}/>

                    <div className="chart chart-bar">
                        <ChartBarWallet transactions={walletDto?.transactionsDto?.list || []}/>
                    </div>
                
                </Col>

                <Col sm={12} md={6} lg={5} xl={5} >

                    <div className="stat-container mb-3">
                        <StatWallet walletStatDto={walletDto}/>

                    </div>
                    <div className="chart">
                        <ChartDoughnut transactionsList={walletDto?.transactionsDto?.list}/>

                    </div>
                </Col>
            </Row>
            
        </>
    );
}

export default WalletContent;
