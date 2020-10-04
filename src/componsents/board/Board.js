import React, { Component } from "react";
import { auth } from "../FirebaseConfig";
import Card, { getCardSymbol } from "../card/Card";
import BoardService from "./BoardService";
import '../../style/components/board.css';

const actions = [
  'PUSH',
  'GET',
  'LEAVE',
]

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: null,
      cardDeck: [],
      selectedCard: null
    }
    this.getCardById = this.getCardById.bind(this);
    this.getCard = this.getCard.bind(this);
  }

  selectCard(event, card) {
    console.log("SELECTED CARD: ", card);
    this.setState({ selectedCard: card });
  }

  getCard(event) {
    const activeCards = this.state.board.cardsStack;
    console.log("BOOO:", this.state.board)
    if (activeCards !== null && activeCards.length > 0) {


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

  pushCard(event) {
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
    if (currentBoard != null && cardDeck != null) {
      let board = JSON.parse(currentBoard);
      let deck = JSON.parse(cardDeck);
      this.setState({ board: board, cardDeck: deck });
    }
  }

  getUserCards(userId) {
    let result = [];
    const boardDes = this.state.board;
    if (boardDes !== null) {
      const userCardsIds = boardDes.userCards;
      const currentUserCards = userCardsIds.filter(element => element.userId === userId);
      if (currentUserCards !== null && currentUserCards.length > 0) {
        const listCardIds = currentUserCards[0].userCards;
        const cardDeck = this.state.cardDeck;
        if (cardDeck !== null) {
          result = cardDeck.filter(e => listCardIds.includes(e.id));
        }
      }
    }
    return result;
  }

  getPinki(userId) {
    let result = [];
    const boardDes = this.state.board;
    if (boardDes !== null) {
      const userCardsIds = boardDes.userCards;
      const currentUserCards = userCardsIds.filter(element => element.userId === userId);
      if (currentUserCards !== null && currentUserCards.length > 0) {
        const listCardIds = currentUserCards[0].pinki;
        const cardDeck = this.state.cardDeck;
        if (cardDeck !== null) {
          result = cardDeck.filter(e => listCardIds.includes(e.id));
        }
      }
    }
    return result;
  }

  getActiveCards() {
    let result = [];
    const boardDes = this.state.board;
    if (boardDes !== null) {
      const cardStack = boardDes.cardsStack;
      if (cardStack !== null && cardStack.length > 0) {
        const cardDeck = this.state.cardDeck;
        if (cardDeck !== null) {
          result = cardDeck.filter(e => cardStack.some(elem => elem.cardId === e.id));
          console.log('Active cards:', result);
        }
      }
    }
    return result;
  }

  getCardById(cardId) {
    console.log("INPUT: ", cardId)
    let result = {};
    if (cardId !== null) {
      const cardDeck = this.state.cardDeck;
      const currentCard = cardDeck.filter(e => e.id === cardId);
      if (currentCard !== null && currentCard.length > 0) {
        result = currentCard[0];
      }
    }
    return result;
  }

  getUserHowsAction(userId) {
    let user = null;
    const board = this.state.board;
    if (board !== null) {
      const currentUser = board.users.filter(e => e.id === userId);
      if (currentUser !== null && currentUser.length > 0) {
        user = currentUser[0];
      }

    }
    return user;
  }


  render() {
    let currentCards = this.getUserCards(auth.currentUser.uid);
    let penki = this.getPinki(auth.currentUser.uid);
    const board = this.state.board;
    let user = null;
    let users = [];
    let userQueue = null;
    if (board !== null) {
      userQueue = board.userQueue;
      user = board.users.find(u => u.id === auth.currentUser.uid);
      users = board.users.filter(u => u.id !== auth.currentUser.uid);
      console.log("TEST", users);
      console.log("TEST2", board.users);
    }

    return (
      <div className="board_container">
        <h1 className="board_title"><span>Игровой стол</span></h1>
        <div className="first_row">
          <img className={users.length === 3 && users[2].id === userQueue ? "logo_name selected_logo" : "logo_name"} alt="profile logo" src={users.length === 3 ? users[2].avatarId : ''} />
          <span>{users.length === 3 ? users[2].nickname : ''}</span>
        </div>
        <div className="second_row">
          <div className="col_first">
            <img className={users.length === 3 && users[1].id === userQueue ? "logo_name selected_logo" : "logo_name"} alt="profile logo" src={users.length === 3 ? users[1].avatarId : ''} />
            <span>{users.length === 3 ? users[1].nickname : ''}</span>
          </div>
          <div className="col_second">
            <div>Козырь
            <img src={this.state.board != null ? getCardSymbol(this.state.board.trumpCard) : ''} alt="suit-symbol" style={{ height: 40, margin: '0 0 0 30px', transform: "translate(-50%, -50%)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {board && board.cardsStack && board.cardsStack.map((cardId, index) => {
                let card = this.getCardById(cardId.cardId);
                return (
                  <div key={cardId.cardId}>
                    <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={true} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col_third">
            <img className={users.length === 3 && users[0].id === userQueue ? "logo_name selected_logo" : "logo_name"} alt="profile logo" src={users.length > 0 ? users[0].avatarId : ''} />
            <span>{users.length > 0 ? users[0].nickname : ''}</span>
          </div>
        </div>
        <div className="therd_row">
          <img className={user != null && user.id === userQueue ? "logo_name selected_logo" : "logo_name"} alt="profile logo" src={user != null ? user.avatarId : ''} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className='card_block' style={{ display: "flex", justifyContent: "center" }}>
              {currentCards && currentCards.map((card, index) => {
                return (
                  <div onClick={(e) => this.selectCard(e, card)} className="animated slideInDown" key={index}>
                    <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={true}
                      isSelected={this.state.selectedCard != null && this.state.selectedCard.id === card.id} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {penki && penki.map((card, index) => {
                return (
                  <div key={card.id}>
                    <Card cardId={card.id} cardSuit={card.cardSuit} cardType={card.cardType} front={false} />
                  </div>
                );
              })}
            </div>
            <div>
              <button className='action_button' id={actions[0]} onClick={this.pushCard.bind(this)}>Положить карту</button>
              <button className='action_button' id={actions[1]} onClick={this.getCard.bind(this)}>Взять карту</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Board;