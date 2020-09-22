import React, { Component } from "react";
import {auth} from "../FirebaseConfig";
import Card from "../card/Card";

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      board: null,
      cardsArray: []
    }
  }

  dealOneCard = () => {
    // let cardsArray = this.state.cardsArray;
    // const randomItem = cardsArray[cardsArray.length - 1];
    // const newCardsArray = cardsArray.filter(element => element.id !== randomItem.id)
    // this.setState({ cardsArray: newCardsArray })
    // let cardsPickedArray = this.state.cardPicked;
    // cardsPickedArray.push(randomItem);
    // this.setState({ cardPicked: cardsPickedArray })
  };

  componentDidMount = () => {
    const currentBoard = window.sessionStorage.getItem("selectedBoard");
    const cardDeck = window.sessionStorage.getItem("cardDeck");
    if(currentBoard != null && cardDeck != null){
      let board = JSON.parse(currentBoard);
      let deck = JSON.parse(cardDeck);
      this.setState({board: board, cardsArray: deck});
    }
  }

  getUserCards(){
    let result = [];
    const boardDes = this.state.board;
    if(boardDes !== null){
      const userCardsIds = boardDes.userCards;
      const userId = auth.currentUser.uid;
      const currentUserCards = userCardsIds.filter(element => element.userId === userId);
      if(currentUserCards !== null && currentUserCards.length > 0){
        const listCardIds = currentUserCards[0].userCards;
        console.log("C2",listCardIds);
        const cardDeck = this.state.cardsArray;
        console.log("Card deck: ", cardDeck);
        if(cardDeck !== null){
          result = cardDeck.filter(e => listCardIds.includes(e.id));
          console.log('RESULT Cards:', result)
        }
      }
    }
    return result;
  }

  getPinki(){
    let result = [];
    const boardDes = this.state.board;
    if(boardDes !== null){
      const userCardsIds = boardDes.userCards;
      const userId = auth.currentUser.uid;
      const currentUserCards = userCardsIds.filter(element => element.userId === userId);
      if(currentUserCards !== null && currentUserCards.length > 0){
        const listCardIds = currentUserCards[0].pinki;
        console.log("C2",listCardIds);
        const cardDeck = this.state.cardsArray;
        console.log("Card deck: ", cardDeck);
        if(cardDeck !== null){
          result = cardDeck.filter(e => listCardIds.includes(e.id));
          console.log('RESULT pinki:', result)
        }
      }
    }
    return result;
  }

    render() {
      let currentCards = this.getUserCards();
      let penki = this.getPinki();

        return (
          <div>
              <h1><span className="font-italic">Игровой стол</span></h1>
              <div style={{ width: "100%" }}>
          {currentCards !== null && currentCards.length > 0 ? (
            <div>
                <h1>Карты на руках</h1>
                <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px", height: 282 }}>
                {currentCards && currentCards.map((card, index) => {
                    return (
                    <div className="animated slideInDown" key={index}>
                        <Card cardSuit={card.cardSuit} cardType={card.cardType} front={true}/>
                    </div>
                    ); 
                })}
                  </div>
                  <div style={{ margin: "40px auto", textAlign: "center" }}>
                      <button onClick={this.dealOneCard}>Deal one card</button>
                      <button onClick={this.flip}>Flip</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px" }}>
                  <h1>Пиньки</h1>
                  {penki && penki.map((card, index) => {
                      return (
                      <div className="animated slideInUp" key={index}>
                          <Card cardSuit={card.cardSuit} cardType={card.cardType} front={false}/>
                      </div>
                      ); 
                  })}
                  </div>
              </div>
            ) 
          : (<div>Карт нет</div>)}

        </div>
          </div>
        )
      }
}

export default Board;