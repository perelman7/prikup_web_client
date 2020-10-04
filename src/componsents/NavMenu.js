import React, { Component } from "react";
import UserService from "./auth/UserService"
import { getToken, firebaseProvider } from "./FirebaseConfig";
import RoomListener from "./ws/RoomListener";
import BoardListener from "./ws/BoardListener";
import CardService from "./card/CardService";

import "../style/components/navmenu.css";

class NavMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      userToken: null,
    }
  }

  componentDidMount = () => {
    const userService = new UserService();
    getToken().then(token => {
      userService.initCurrentUser(token).then(user => this.setState({ currentUser: user }));
      const cardService = new CardService();
      cardService.initCardDeck(token);
      this.setState({userToken: token});
    })
  }

  render() {
    const user = this.state.currentUser;
    return (
      <div className="nav_menu">
        <div className="app_name_block">
          <a className="app_name" href="/">Прикуп</a>
        </div>
        <div className="tabs">
          <a className="link" href="/roomTable">Активные комнаты</a>
          <a className="link" href="/createRoom">Создать свою комнату</a>
          <a className="link" href="/settings">Настройки</a>
          <a className="link" href="/room">Выбранная комната</a>
          <a className="link" href="/board">Текущая игра</a>
        </div>
        <div>
          {user != null
            ? (<div className="full_user_info">
              <div className="user_info">
                <div className="username">Имя: {user.nickname}</div>
                <div className="username">Кредиты:{user.credits}</div>
                <div className="username">Коины: {user.coins}</div>
              </div>
              <img className="logo_name" alt="profile logo" src={user.avatarId} />
              <RoomListener />
              <BoardListener />
            </div>)
            : (<div></div>)}
        </div>
        <div className="sign_out_block">
          <button className="sign_out" onClick={() => firebaseProvider.auth().signOut()}>Sign out</button>
          <button className="sign_out" onClick={() => alert('Bearer: ' + this.state.userToken)}>Получить токен</button>
        </div>
      </div>
    )
  }
}

export default NavMenu;