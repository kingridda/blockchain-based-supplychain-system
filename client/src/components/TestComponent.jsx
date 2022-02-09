import React from "react";
import {Card, CardBody, CardTitle, CardText, Col, Row, CardFooter} from "reactstrap";
//0xc27a6adac593d1c02355f307ea92f6261269566d

import "../test.css";

function RenderCardTest(item){
    return(
        <div>
           <Card>
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <CardFooter>oo</CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}

function Test(props){
    return (

        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="container">
          <p>

          </p>
          <div className="row">
            <div className="timeline-centered">
              <article className="timeline-entry">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-success">
                    <i className="entypo-feather" />
                  </div>
                  <div className="timeline-label">
                    <h2>Transition Name</h2>
                    <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>
                  </div>
                </div>
              </article>
              <article className="timeline-entry left-aligned">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-secondary">
                    <i className="entypo-suitcase" />
                  </div>
                  <div className="timeline-label">
                    <h2>Transition Name</h2>
                    <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>
                  </div>
                </div>
              </article>
              <article className="timeline-entry">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-09T13:22"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-info">
                    <i className="entypo-location" />
                  </div>
                  <div className="timeline-label">
                    <h2>Transition Name</h2>
                    <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>
                    
                  </div>
                </div>
              </article>
              <article className="timeline-entry left-aligned">
                <div className="timeline-entry-inner">
                  <time className="timeline-time" dateTime="2014-01-10T03:45"><span>03:45 AM</span> <span>Today</span></time>
                  <div className="timeline-icon bg-warning">
                    <i className="entypo-camera" />
                  </div>
                  <div className="timeline-label">
                    <h2>Transition Name</h2>
                    <p>You have a meeting at <strong>Laborator Office</strong> Today.</p>
                  </div>
                </div>
              </article>
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