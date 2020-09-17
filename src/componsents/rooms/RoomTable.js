import React, { Component } from "react";
import RoomService from "./RoomService";
import {} from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

class RoomTable extends Component {

  constructor(props){
    super(props);
    this.state = { 
      listRooms: [],
      roomId: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("SELECT: ", event.target.id)
    this.setState({roomId: event.target.id});
  }

  handleSubmit(event) {
    const roomService = new RoomService();
    roomService.enterToRoom(this.state.roomId)
    event.preventDefault();
  }

  componentDidMount = async () => {
      const roomService = new RoomService();
      const list = await roomService.getRooms();
      console.log("LIST ROOMS", list)
      this.setState({listRooms: list});
  }

  renderTableData() {
    const rooms = this.state.listRooms;
    console.log("rooms: ", rooms);
    if(rooms){
      return rooms.map((room, index) => {
        const { id, cardCountType, dealCardsType, maxPlayers, users, withPenalty, bet } = room
        return (
            <tr key={id}>
              <td>{cardCountType}</td>
              <td>{dealCardsType}</td>
              <td>{users.length + " из " + maxPlayers}</td>
              <td>{bet}</td>
              <td>{withPenalty ? "Да" : "Нет"}</td>
              <td><button id={id} onClick={this.handleChange}>Выбрать</button></td>
           </tr>
        )
     })
    }else{
      return <tr></tr>
    }

 }
    render() {
        return (
          <div>
              <h1>Rooms</h1>
              <table id='students'>
                <thead>
                  <tr>
                    <td>Тип колоды</td>
                    <td>Тип раздачи</td>
                    <td>Кол-во играков</td>
                    <td>Ставка</td>
                    <td>С наказаниями</td>
                    <td></td>
                  </tr>
                </thead>
               <tbody >
                {this.renderTableData()}
               </tbody>
            </table>
              <button onClick={this.handleSubmit}>Начать игру</button>
              <Nav.Link href="/createRoom">Создать свою комнату</Nav.Link>
          </div>
        )
      }
}

export default RoomTable;