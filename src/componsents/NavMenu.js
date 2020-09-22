import React, { Component } from "react";
import UserService from "./auth/UserService"
import {getToken, firebaseProvider} from "./FirebaseConfig";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RoomListener from "./ws/RoomListener";
import BoardListener from "./ws/BoardListener";
import CardService from "./card/CardService";

class NavMenu extends Component{ 

  constructor(props){
    super(props);

    this.state = { 
      currentUser: null,
    }
  }
  
  componentDidMount = () => {
    const userService = new UserService();
    getToken().then(token => {
      userService.initCurrentUser(token).then(user => this.setState({currentUser: user}));
      const cardService = new CardService();
      cardService.initCardDeck(token);
    })
  }
    render() {
      const user = this.state.currentUser;
        return (
          <div className="App">
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Прикуп</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/roomTable">Активные комнаты</Nav.Link>
                <Nav.Link href="/createRoom">Создать свою комнату</Nav.Link>
                <Nav.Link href="/settings">Настройки</Nav.Link>
                <Nav.Link href="/room">Выбранная комната</Nav.Link>
                <Nav.Link href="/board">Текущая игра</Nav.Link>
              </Nav>
              <Form inline>
                <button onClick={() => firebaseProvider.auth().signOut()}>Sign out!</button>
                {user != null 
                ? (<div>
                    <h1>{user.nickname}</h1>
                    <img style={{height:"80px"}} alt="profile logo" src={user.avatarId} />
                    <RoomListener/>
                    <BoardListener/>
                </div>) 
                : (<div></div>)}
              </Form>
            </Navbar.Collapse>
          </Navbar>
          </div>
        )
      }
}

export default NavMenu;