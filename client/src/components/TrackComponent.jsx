import React from "react";
import {Card, CardBody, CardTitle, CardText, Col, Row, CardFooter} from "reactstrap";
function RenderCard(item){
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

function Track(props){
    return (
        <div className="container" >
            Track container
            <Row>
                <Col sm="6">
                <RenderCard  />
                </Col>
            </Row>
            <Row>
                <Col sm="6"></Col>
                <Col sm="6">
                <RenderCard />
                </Col>
            </Row>
            <Row>
                <Col sm="3"></Col>
                <Col sm="6">
                <RenderCard />
                </Col>
            </Row>


        </div>
    );
}

export default Track;