import React, { Component } from "react";
import UserService from "./auth/UserService"
import {getToken, firebaseProvider} from "./FirebaseConfig";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import RoomListener from "./ws/RoomListener";

class NavMenu extends Component{ 

  constructor(props){
    super(props);

    this.state = { 
      currentUser: null,
    }
  }
  
  componentDidMount = async () => {
    const userService = new UserService();
    const token = await getToken();
    const user = await userService.initCurrentUser(token);
    this.setState({currentUser: user});
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
                
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <button onClick={() => firebaseProvider.auth().signOut()}>Sign out!</button>
                {user != null 
                ? (<div>
                    <h1>{user.nickname}</h1>
                    <img alt="profile logo" src={user.avatarId} />
                    <RoomListener/>
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