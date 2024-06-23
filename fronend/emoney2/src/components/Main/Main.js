import React from "react";
import "./Main.css"
import { useNavigate } from "react-router";
import imgOne from "../../static/main_image1.jpeg"
import imgTwo from "../../static/main_image2.jpeg"
import { Row, Col } from "react-bootstrap";
import FooterComp from "../FooterComp";

function Main(){
  const navigate = useNavigate();


    return <>
      <div className="introduction-container">
        <div style={{maxWidth:"80%",
          margin:"0 auto",
          fontSize:"large"}}>    
          <h1 className="reddit-black-font">
             Welcome to eMoney
          </h1>

          <p className="reddit-medium-font" style={{fontSize:"x-large"}}>
            Take control of your finances with ease using our comprehensive tool for tracking expenses and incomes, and gain valuable insights from our expert financial blogs.
          </p>
            <button onClick={()=>{navigate("/signup")}} className="button-join">
              Join Now
            </button>
        </div>

        <div className="image-black-container">
          <img 
            src={imgOne}/>
        </div>


        <div className="success-story-container reddit-black-font">
          <h1>
            Our Success Story
          </h1>
          <p className="reddit-regular-font">
            Discover how eMoney has revolutionized money management for our users and helped them achieve their financial goals with success stories and testimonials.
          </p>

          <Row className="small-containers d-flex justify-content-center">
            <Col  sm = {6} md lg xl = {4} className="my-3 d-flex justify-content-center">
              <div className="small-container">
                  <h2>1000</h2>
                  <p>Happy Clients</p>
              </div>

            </Col>

            <Col   sm = {6} md lg xl = {4} className="my-3 d-flex justify-content-center">
              <div className="small-container">
                    <h2>500</h2>
                    <p>Blog Articles</p>
              </div>

            </Col>
            <Col  sm  md = {12} lg xl = {4} className="my-3 d-flex justify-content-center">
              <div className="small-container">
                  <h2>300</h2>
                  <p>Active Features</p>
              </div>

            </Col>
          </Row>


        </div>

        <div className="powerfull-features-container">
          <Row>
            <Col sm={12} md={6}>
              <div className="text">
                <h1 className="reddit-black-font">Powerful Features</h1>
                <p className="reddit-regular-font">
                  eMoney is loaded with features designed to offer you a complete picture of your financial landscape, helping you make informed decisions every day.
                </p>

                <Row className="d-flex justify-content-start">
                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _011c7470" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path>
                    </svg>
                  </Col>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <h4 className="reddit-bold-font">Easy Sync</h4>
                    <p className="reddit-regular-font">
                      Seamlessly connect all your accounts and transactions in one place with real-time updates for a complete financial overview.
                    </p>
                  </Col>

                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _011c7470" fill="currentColor" width="24" height="24" viewBox="0 0 512 512">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                  </Col>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <h4 className="reddit-bold-font">Smart Budget</h4>
                    <p className="reddit-regular-font">
                      Create personalized budget plans with intelligent recommendations to save more and spend wisely.
                    </p>
                  </Col>

                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _011c7470" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                    </svg>
                  </Col>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <h4 className="reddit-bold-font">Insightful Reports</h4>
                    <p className="reddit-regular-font">
                      Visualize your financial health with detailed reports that help you track progress and identify trends.
                    </p>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <button className="more-info-button" onClick={() => { navigate("/about") }}>
                      <span className="reddit-semibold-font">More info</span>
                    </button>
                  </Col>
                </Row>
              </div>
            </Col>

              <Col sm = {12} md lg xl = {6} className="d-flex justify-content-center" >
                <img src={imgTwo}></img>
              </Col>

          </Row>


        </div>

        <div className="general-data-container">
          <h1 className="reddit-black-font">
            Why Choose Us
          
          </h1>
          <p className="reddit-regular-font" style={{fontSize:"x-large"}}>
            eMoney goes beyond tracking – it's your financial assistant empowering smarter decisions and achieving financial freedom.
          </p>


          <Row className="mt-5 reddit-regular-font">
            <Col xs={12} sm= {12} md={4} lg={4} xl={4}>
              <Row>
                <Col xs={2} sm={2} md={2} lg={1} xl={1} className="d-flex justify-content-center">

                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="um-icon _9c5b0563" 
                      fill="currentColor" 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24"
                      style={{paddingTop:"0.5rem"}}>
                      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"></path>
                  </svg>
                </Col>
                <Col   xs={10} sm={10} md={10} lg={11} xl={11}>
                  <h2 className="reddit-bold-font">
                    Real Security
                  </h2>
                  <p>
                  Your data's safety is our top priority. Enjoy peace of mind with state-of-the-art encryption and security measures.
                  </p>
                </Col>
              </Row>
              
            </Col>
            
            <Col xs={12} sm= {12} md={4} lg={4} xl={4}>
              <Row>
                <Col xs={2} sm={2} md={2} lg={1} xl={1} className="d-flex justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg"
                 className="um-icon _9c5b0563" 
                 fill="currentColor" 
                 width="40" 
                 height="40" 
                 viewBox="0 0 30 30"
                 style={{paddingTop:"0.5rem"}}>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path>
                </svg>

                </Col>
                <Col  xs={10} sm={10} md={10} lg={11} xl={11}>
                  <h2 className="reddit-bold-font">
                  24/7 Support
                  </h2>
                  <p>
                    Questions? Our dedicated support team is ready all day, every day to help you navigate any issues or concerns.

                  </p>
                </Col>
              </Row>
            </Col>


            <Col xs={12} sm= {12} md={4} lg={4} xl={4}>
            <Row>
                <Col  xs={2} sm={2} md={2} lg={1} xl={1} className="d-flex justify-content-center" >
                <svg xmlns="http://www.w3.org/2000/svg"
                 className="um-icon _9c5b0563" 
                 fill="currentColor" 
                 width="40" 
                 height="40" 
                 viewBox="0 0 30 30"
                 style={{paddingTop:"0.5rem"}}>
                <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"></path>
                </svg>
                </Col>
                <Col xs={10} sm={10} md={10} lg={11} xl={11}>
                  <h2 className="reddit-bold-font">
                  Savings Goals
                  </h2>
                  <p>
                  Set and achieve your savings targets with our tailored goal-setting features and progress tracking.

                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="general-data-container">
          <h1 className="reddit-black-font">
            FAQs about eMoney
          </h1>
          <p className="reddit-regular-font" style={{fontSize:"x-large"}}>
            Get quick answers to the most common questions you might have about managing your finances with eMoney.
          </p>

          <Row className="reddit-regular-font"  style={{fontSize:"large"}}>
            <Col  xm={12}  sm ={12} md={6}  lg={6} xl ={6} className="px-5" >
              <h3 className="reddit-semibold-font">
                How do I start?
              </h3>
              <p>
               Sign up for free, link your accounts, and begin tracking your financial activity all in one place effortlessly.
              </p>
            </Col>
            <Col  xm={12}  sm ={12} md={6}  lg={6} xl ={6} className="px-5">
            <h3 className="reddit-semibold-font">
              Can I set budgets?
              </h3>
              <p>
              Yes, our budgeting tools are designed to help you create, manage, and monitor budgets tailored to your lifestyle.
              </p>
            </Col>
            <Col  xm={12}  sm ={12} md={6}  lg={6} xl ={6} className="px-5">
            <h3 className="reddit-semibold-font">
              Is my data safe?
            </h3>
            <p>
              Absolutely. We use the latest technology to ensure your information is encrypted and securely stored.          </p>
            </Col>
            <Col xm={12}  sm ={12} md={6}  lg={6} xl ={6} className="px-5">
            <h3 className="reddit-semibold-font"> 
              What are the costs?
              </h3>
              <p>
              eMoney offers both free and premium features. Start for free and choose to upgrade anytime for advanced features.
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <FooterComp/>

    </>
    
}


export default Main;