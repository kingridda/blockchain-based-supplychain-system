import React from "react";
import PayTransition from './PayTransitionComponent';
import { format } from 'date-fns';


//0xc27a6adac593d1c02355f307ea92f6261269566d

import "../test.css";
import { Button } from "reactstrap";



function RenderCard({itemname, itemdescription, align, circleCol, itemDate}){
  return(
    <article className={'timeline-entry ' + align}>
      <div className="timeline-entry-inner">
        <time className="timeline-time" dateTime="2014-01-10T03:45">
          <span>{format(new Date(), 'yyyy/MM/dd kk:mm') }</span>
        </time>
        <div className= {'timeline-icon ' +  circleCol}>
          <i className="entypo-feather" />
        </div>
        <div className="timeline-label">
          <h2><a href="#">{itemname}</a></h2>
          <p>{itemdescription}</p>

        </div>
      </div>
  </article>

  );
}


function Track(props){
  var paymentOpened = true;


    return (

        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="container">
          <div className="row">
            <div className="timeline-centered">
              <p>

              </p>
              {
              props.item && props.item.transitions.map((transition, index) => 
                (<RenderCard key={transition.name+transition.createdAt+index} 
                  onClick={props.payManufacturarModal}
                  itemname = {""}
                  itemdescription = {""}
                  itemDate={transition.createdAt} 
                  circleCol={(transition.decision)?"bg-success":"bg-danger"}
                   align={(index%2)?"left-aligned":""} />))
              }
              <RenderCard  itemname={"Apple Inc"} itemdescription={" Apple Inc. designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories, and sells a variety of related services. The Company's products include iPhone, Mac, iPad, and Wearables, Home and Accessories. iPhone is the Company's line of smartphones based on its iOS operating system. "} circleCol={"bg-success"}/>
              <RenderCard align={"left-aligned"} itemname={"Administration marocaine des Douanes et Impôts Indirects"} itemdescription={" Chargée de la perception des droits et taxes douanières, du recouvrement des impositions fiscales et parafiscales, de la lutte contre les trafics illicites et du contrôle des marchandises et des personnes aux frontières "} circleCol={"bg-success"}/>
              <RenderCard itemname={"Marjane Hay Riad, Rabat"} itemdescription={" Marjane (also Marjane Holding) a Moroccan hypermarket chain. It is wholly owned by SNI,the name of the company has changed to 'Al Mada'. The chain opened its first supermarket, in 1990, in Rabat. In 2008, the company had 33 hypermarkets around Morocco. "} circleCol={"bg-success"}/>

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

export default Track;