import React from "react";
import backCardImg from "../../style/images/backCardImg.png";
import heart from "../../style/images/heart.png";
import diamond from "../../style/images/diamond.png";
import club from "../../style/images/club.png";
import spade from "../../style/images/spade.png";

import "../../style/components/card.scss";

const Card = (props) => {

  const { cardSuit, cardType, front } = props;

  const getCardSymbol = (cardSuit) => {
    let symbol;
    switch(cardSuit) {
      case "DIAMONDS":
        return symbol = diamond;
      case "HEARTS":
        return symbol = heart;
      case "CLUBS":
        return symbol = club;
      case "SPADES":
        return symbol = spade;
      default:
        return symbol;
    };
  };

  const getColor = (cardSuit) => {
    let symbol;
    switch(cardSuit) {
      case "DIAMONDS":
        return symbol = diamond;
      case "HEARTS":
        return symbol = heart;
      case "CLUBS":
        return symbol = club;
      case "SPADES":
        return symbol = spade;
      default:
        return symbol;
    };
  };
  const resColor = getColor(cardSuit);

  if(front === true) {
    const cardSymbol = getCardSymbol(cardSuit);

    return (
      <div className="card-container" style={{ color: `${resColor}` }}>
        <div  style={{ position: "absolute", top: 5, left: 5 }}>
          <div style={{ maxWidth: 20 }}>{cardType}</div>
          <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 20 }}/>
        </div>
        <div>
          <img src={cardSymbol} alt="suit-symbol" style={{ height: 40, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>
        </div>
        <div style={{ position: "absolute", bottom: 5, right: 5, transform: "rotate(-180deg)" }}>
          <div style={{ maxWidth: 20 }}>{cardType}</div>
          <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 20 }}/>        
        </div>
      </div> 
    );
  } else {
    return (
      <div className="card-container" style={{ backgroundImage: `url(${backCardImg})`, color: `${resColor}` }}></div>
    );
  };
};


export default Card;