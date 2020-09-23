import React, { Component } from "react";
import {auth} from "../FirebaseConfig";
import Card from "../card/Card";
import BoardService from "./BoardService";

const actions = [
  'PUSH', 
  'GET',
  'LEAVE',
]

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      board: null,
      cardDeck: [],
      selectedCard: null
    }
    this.getCardById = this.getCardById.bind(this);
    this.getCard = this.getCard.bind(this);
  }

  selectCard(event, card){
      console.log("SELECTED CARD: ", card);
      this.setState({selectedCard: card});
  }

  getCard(event){
    const activeCards = this.state.board.cardsStack;
    console.log("BOOO:", this.state.board)
    if(activeCards !== null && activeCards.length > 0){

     
      const lastCard = activeCards[0];
      let card = this.getCardById(lastCard.cardId);
      alert(card.id + " : " + card.cardSuit + " : " + card.cardType);

      const actionModel = {
        boardId: this.state.board.id,
        cardId: lastCard.cardId,
        userId: auth.currentUser.uid,
        action: event.target.id
      }
      console.log("Action model get: ", actionModel);
      new BoardService().sendAction(actionModel);
    }
  }

  pushCard(event){
    const actionModel = {
      boardId: this.state.board.id,
      cardId: this.state.selectedCard.id,
      userId: auth.currentUser.uid,
      action: event.target.id
    }
    console.log("Action model push: ", actionModel);

    new BoardService().sendAction(actionModel);
  };

  componentDidMount = () => {
    const currentBoard = window.sessionStorage.getItem("selectedBoard");
    const cardDeck = window.sessionStorage.getItem("cardDeck");
    if(currentBoard != null && cardDeck != null){
      let board = JSON.parse(currentBoard);
      let deck = JSON.parse(cardDeck);
      this.setState({board: board, cardDeck: deck});
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
        const cardDeck = this.state.cardDeck;
        if(cardDeck !== null){
          result = cardDeck.filter(e => listCardIds.includes(e.id));
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
        const cardDeck = this.state.cardDeck;
        if(cardDeck !== null){
          result = cardDeck.filter(e => listCardIds.includes(e.id));
        }
      }
    }
    return result;
  }

  getActiveCards(){
    let result = [];
    const boardDes = this.state.board;
    if(boardDes !== null){
      const cardStack = boardDes.cardsStack;
      if(cardStack !== null && cardStack.length > 0){
        const cardDeck = this.state.cardDeck;
        if(cardDeck !== null){
          result = cardDeck.filter(e => cardStack.some(elem => elem.cardId === e.id));
          console.log('Active cards:', result);
        }
      }
    }
    return result;
  }

  getCardById(cardId){
    console.log("INPUT: ", cardId)
    let result = {};
    if(cardId !== null){
      const cardDeck = this.state.cardDeck;
      const currentCard = cardDeck.filter(e => e.id === cardId);
      if(currentCard !== null && currentCard.length > 0){
        result = currentCard[0];
      }
    }
    return result;
  }

  getUserHowsAction(board){
    let user = null;
    if(board !== null){
        const currentUser = board.users.filter(e => e.id === board.userQueue);
        if(currentUser !== null && currentUser.length > 0){
          user = currentUser[0];
        }
        
    }
    return user;
  }


    render() {
      let currentCards = this.getUserCards();
      let penki = this.getPinki();
      const board = this.state.board;
      const user = this.getUserHowsAction(board);
      console.log("USER RES: ", user)

        return (
          <div>
              <h1><span className="font-italic">Игровой стол</span></h1>
        <h1>{user !== null ? "Сейчас ходит: " + user.nickname + " : " + user.id : ""}</h1>
              <div style={{ width: "100%" }}>
          {currentCards !== null && currentCards.length > 0 ? (
            <div>
                <h1>Активные карты</h1>
                <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px", height: 282 }}>
                {board && board.cardsStack && board.cardsStack.map((cardId, index) => {
                  console.log("Card id: ", cardId.cardId);
                  let card = this.getCardById(cardId.cardId);
                  console.log("CCC CARD: ", card)
                    return (
                    <div className="animated slideInDown" key={index}>
                        <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={true}/>
                    </div>
                    ); 
                })}
                  </div>
              <h1>Карты на руках {this.state.selectedCard !== null ? ", Выбраная карта: " + this.state.selectedCard.cardSuit + " : " + this.state.selectedCard.cardType : ''}</h1>
                <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px", height: 282 }}>
                {currentCards && currentCards.map((card, index) => {
                    return (
                    <div onClick={(e) => this.selectCard(e, card)} className="animated slideInDown" key={index}>
                        <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={true}/>
                    </div>
                    ); 
                })}
                  </div>
                  <div style={{ margin: "40px auto", textAlign: "center" }}>
                      <button id={actions[0]} onClick={this.pushCard.bind(this)}>Положить карту</button>
                      <button id={actions[1]} onClick={this.getCard.bind(this)}>Взять карту</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px" }}>
                  <h1>Пиньки</h1>
                  {penki && penki.map((card, index) => {
                      return (
                      <div className="animated slideInUp" key={index}>
                          <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={false}/>
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