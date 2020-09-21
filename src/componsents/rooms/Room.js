import React, { Component } from "react";

class Room extends Component {

  constructor(props){
    super(props);
    this.state = {
      room: null,
    }
  }

  componentDidMount = () => {
    const currentRoom = window.sessionStorage.getItem("selectedRoom");
    console.log("CURRENT ROOM: ", currentRoom);
    if(currentRoom != null){
      this.setState({room: JSON.parse(currentRoom)});
    }
  }

  renderTableData() {
    const room = this.state.room;
    console.log("Current room render table: ", room);
    if(room){
        const { id, cardCountType, dealCardsType, maxPlayers, users, withPenalty, bet } = room;
        return (
            <tr key={id}>
              <td>{cardCountType}</td>
              <td>{dealCardsType}</td>
              <td>{users.length + " из " + maxPlayers}</td>
              <td>{bet}</td>
              <td>{withPenalty ? "Да" : "Нет"}</td>
           </tr>
        )
    }else{
      return <tr></tr>
    }
 }

    render() {
        return (
          <div>
              <h1>Ожидаем подключения играков</h1>
              <table id='rooms'>
                <thead>
                  <tr>
                    <td>Тип колоды</td>
                    <td>Тип раздачи</td>
                    <td>Кол-во играков</td>
                    <td>Ставка</td>
                    <td>С наказаниями</td>
                  </tr>
                </thead>
               <tbody >
                {this.renderTableData()}
               </tbody>
            </table>
          </div>
        )
      }
}

export default Room;