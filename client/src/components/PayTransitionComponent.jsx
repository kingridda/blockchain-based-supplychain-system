import React from "react";
import "../PayTransition.css";

function PayTransition(props) {
  return (
    <div className="payTransitionBackground">
      <div className="payTransitionContainer">
        <div className="titleCloseBtn">
        {/*
        <button
            onClick={() => {
              setOpenPayTransition(false);
            }}
          >
            X
          </button>
        */}  
        <button>X</button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>If you want to pay the transition please click on CONTINUE. Otherwise, click on CANCEL !</p>
        </div>
        <div className="footer">
        {/*
        <button
            onClick={() => {
              setOpenPayTransition(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
         */}  
          <button id="cancelBtn">Cancel</button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default PayTransition;