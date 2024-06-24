import React, { useEffect, useState } from "react";
import { Col, Alert, Row } from "react-bootstrap";
import api from "../../api/axios"
import { getConfig , isJwtToken} from "../../utils/jwtToken";
import "./WalletsPage.css"
import SideBar from "./SideBar";
import WalletContent from "./WalletContent";
import FooterComp from "../FooterComp";


function WalletsPage() {
    const [wallets, setWallets] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState("");
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
        checkToken();
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
        { isLogged ?
            <Row style={{marginBottom:"0rem"}}>
                <Col sm ={12} md ={3} lg={3}>
                    <SideBar wallets={wallets} setSelectedWalletId={setSelectedWalletId}/>

                </Col>
                <Col>
                    <WalletContent selectedWalletId={selectedWalletId}/>
                </Col>

            </Row>
            :
            <div style={{height:"80vh"}}>
                <Alert variant="danger" className="px-auto text-center" style={{margin:"4rem 4rem"}}>
                    <h2 className="reddit-bold-font">Firstly, you need to login</h2>
                </Alert>
            </div>}
            <FooterComp />

        
            
            
        </>
  );
            

}

export default WalletsPage;
