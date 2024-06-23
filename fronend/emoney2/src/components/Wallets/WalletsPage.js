import React, { useEffect, useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import api from "../../api/axios"
import { getConfig } from "../../utils/jwtToken";
import "./WalletsPage.css"
import SideBar from "./SideBar";
import WalletContent from "./WalletContent";
import FooterComp from "../FooterComp";


function WalletsPage() {
    const [wallets, setWallets] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState("");


    const getWallets = async() =>{
        try{
            const response = await api.get("api/v1/wallets", getConfig())
            setWallets(response.data);
            setSelectedWalletId(response.data[0].id)
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        getWallets();
    }, [])

    useEffect(()=>{
        const updatedWallets = wallets.map(wallet => {
            if (wallet.id === selectedWalletId) {
              return { ...wallet, active: true };
            } else {
              return { ...wallet, active: false }; 
            }
          });
        setWallets(updatedWallets); 
    }, [selectedWalletId])


    

    return (
        <>
        <Row style={{marginBottom:"0rem"}}>
            <Col sm ={12} md={4} lg={3}>
                <SideBar wallets={wallets} setSelectedWalletId={setSelectedWalletId}/>

            </Col>
            <Col>
                <WalletContent selectedWalletId={selectedWalletId}/>
            </Col>

        </Row>
        <FooterComp />

        
            
            
        </>
  );
            

}

export default WalletsPage;
