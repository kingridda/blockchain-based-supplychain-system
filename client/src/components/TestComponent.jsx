import React from "react";
import { useState } from "react"
import PayTransition from './PayTransitionComponent';

import {Card, CardBody, CardTitle, CardText, Col, Row, CardFooter} from "reactstrap";
//0xc27a6adac593d1c02355f307ea92f6261269566d

import "../test.css";



function RenderCard({itemname, itemdescription, align, circleCol}){

  {/* const [payTransitionOpen, setPayTransitionOpen] = useState(false); */}
  
  return(
    <article className={'timeline-entry ' + align}>
      <div className="timeline-entry-inner">
        <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
        <div className= {'timeline-icon ' +  circleCol}>
          <i className="entypo-feather" />
        </div>
        <div className="timeline-label">
          <h2><a href="#">{itemname}</a></h2>
          <p>{itemdescription}</p>
        </div>
      
      {/*
      
      <button onClick={() => {
               setPayTransitionOpen(true); }}> Open </button>          
        </div>
        {payTransitionOpen && <PayTransition setOpenPayTransition={setPayTransitionlOpen} />}
      */} 
       
      </div>
  </article>

  );
}


function Test(props){

    return (

        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="container">
          <div className="row">
            <div className="timeline-centered">
              <p>

              </p>

              <RenderCard itemname={"Transition Name"} itemdescription={" Some Description Some Description Some Description Some Description Some Description Some Description Some Description Some Description "} circleCol={"bg-success"}/>
              <RenderCard align={"left-aligned"} itemname={"Transition Name"} itemdescription={" Some Description Some Description Some Description Some Description Some Description Some Description Some Description Some Description "} circleCol={"bg-secondary"}/>
              <RenderCard itemname={"Transition Name"} itemdescription={" Some Description Some Description Some Description Some Description Some Description Some Description Some Description Some Description "} circleCol={"bg-info"}/>
              <RenderCard itemname={"Transition Name"} itemdescription={" Some Description Some Description Some Description Some Description Some Description Some Description Some Description Some Description "} align={"left-aligned"} circleCol={"bg-warning"}/>                      
              <article className="timeline-entry begin">
                <div className="timeline-entry-inner">
                  <div className="timeline-icon" style={{WebkitTransform: 'rotate(-90deg)', MozTransform: 'rotate(-90deg)'}}>
                    <i className="entypo-flight" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>       
        
    );
}

export default Test;