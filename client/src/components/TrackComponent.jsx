import React from "react";
import PayTransition from './PayTransitionComponent';
import { format } from 'date-fns';


//0xc27a6adac593d1c02355f307ea92f6261269566d

import "../test.css";



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
          <button onClick={() => { }}> Open </button>          

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
                (<RenderCard key={transition.name+transition.createdAt+index} itemDate={transition.createdAt} circleCol={(transition.decision)?"bg-success":"bg-danger"} align={(index%2)?"left-aligned":""} />))
              }

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

export default Track;