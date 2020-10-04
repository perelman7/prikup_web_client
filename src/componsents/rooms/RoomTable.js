import React, { Component } from "react";
import RoomService from "./RoomService";

import "../../style/components/roomtable.css";

class RoomTable extends Component {

  constructor(props) {
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
    this.setState({ roomId: event.target.id });
  }

  handleSubmit(event) {
    const roomService = new RoomService();
    roomService.enterToRoom(this.state.roomId)
    event.preventDefault();
  }

  componentDidMount = () => {
    const roomService = new RoomService();
    roomService.getRooms().then(list => this.setState({ listRooms: list }));
  }

  renderTableData() {
    const rooms = this.state.listRooms;
    if (rooms) {
      const currentId = this.state.roomId;
      return rooms.map((room, index) => {
        const { id, cardCountType, dealCardsType, maxPlayers, users, withPenalty, bet } = room
        return (
          <tr key={id} style={{ backgroundColor: currentId === id ? '#cccccc' : '', }}>
            <td>{cardCountType}</td>
            <td>{dealCardsType}</td>
            <td>{users.length + " из " + maxPlayers}</td>
            <td>{bet}</td>
            <td>{withPenalty ? "Да" : "Нет"}</td>
            <td><button className="select_button" id={id} onClick={this.handleChange}>Выбрать</button></td>
          </tr>
        )
      })
    } else {
      return <tr></tr>
    }
  }

  render() {
    return (
      <div className="room_table_container">
        <div className="room_table_header">Существующие комнаты</div>
        <table id='rooms'>
          <thead>
            <tr>
              <th>Тип колоды</th>
              <th>Тип раздачи</th>
              <th>Кол-во играков</th>
              <th>Ставка</th>
              <th>С наказаниями</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {this.renderTableData()}
          </tbody>
        </table>
        <button className="action_button" onClick={this.handleSubmit}>Присоединиться к столу</button>
        <a className="action_button" href="/createRoom">Создать свою комнату</a>
      </div>
    )
  }
}

export default RoomTable;