import React from "react";
import {Card, CardBody, CardTitle, CardText, Col, Row, CardFooter} from "reactstrap";
//0xc27a6adac593d1c02355f307ea92f6261269566d

function Test2(props){
    let i = props.item
    console.log(i )
    return (
        <div className="container">
            item: { i}
        </div>
    );
}

export default Test2;