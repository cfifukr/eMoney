import React, { useEffect } from "react";
import "./WalletsPage.css";
import { IoWalletOutline } from "react-icons/io5";



function SideBar({wallets,  setSelectedWalletId}) {

 
  const chooseAnotherWallet = (walletId) =>{
    setSelectedWalletId(walletId);
  }

  useEffect(() => {
    setSelectedWalletId(wallets[0]?.id)
  },[])

  return (
    <div className="d-flex flex-column  p-3 text-white bg-dark sidebar sidebar-wrapper">
      <span href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none">
        <span className="fs-4 px-3">
             <IoWalletOutline className="pb-1"style={{fontSize:"x-large", margin:"auto"}}/>
             <h3 style={{display:"inline-block"}}>Wallets</h3> 
         </span>
      </span>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {wallets ? (wallets.map((wallet) => { 
          return<li  key= {wallet.id + " " +  wallet.currency}
                          className="nav-item" 
                          onClick={()=>chooseAnotherWallet(wallet.id)}>

                            <a href={`# + ${wallet.id}`}
                              className= {`nav-link ${wallet.active ? "active" :""}`}
                              style={{color:"#F3F4F6"}}  
                              aria-current="page">
                            <IoWalletOutline className="pb-1" style={{fontSize:"x-large", margin:"auto"}}/>
                                {wallet.name}
                            </a>
                        </li>
                   
        })): "No wallet available"}
      </ul>
      
    </div>
  );
}

export default SideBar;

