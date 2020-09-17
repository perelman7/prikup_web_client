import React, { Component } from "react";
import RoomService from "./RoomService";
import {} from "react-bootstrap/Form";

class CreateOwnRoom extends Component {

  constructor(props){
    super(props);
    this.state = { 
      buildType: "DEFAULT",
      maxPlayers: 4,
      isRating: false,
      bet: 10,
      dealCardsType: "AUTO",
      withPenalty: false,
      cardCountType: "SHORT",
      type:"PUBLIC"
    }
    this.handleChangeBuildType = this.handleChangeBuildType.bind(this);
    this.handleChangeDealCardsType = this.handleChangeDealCardsType.bind(this);
    this.handleChangeCardCountType = this.handleChangeCardCountType.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeMaxPlayers = this.handleChangeMaxPlayers.bind(this);
    this.handleChangeBet = this.handleChangeBet.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeBuildType(event) {
    console.log("Value:",event.target.value);
    this.setState({buildType: event.target.value});
  }
  handleChangeDealCardsType(event) {
    console.log("Value:",event.target.value);
    this.setState({dealCardsType: event.target.value});
  }
  handleChangeCardCountType(event) {
    console.log("Value:",event.target.value);
    this.setState({cardCountType: event.target.value});
  }
  handleChangeType(event) {
    console.log("Value:",event.target.value);
    this.setState({type: event.target.value});
  }
  handleChangeMaxPlayers(event){
    console.log("Value:",event.target.value);  
    this.setState({maxPlayers: event.target.value});
  }
  handleChangeBet(event){
    console.log("Value:",event.target.value);
    this.setState({bet: event.target.value});
  }

  async handleSubmit(event) {
      console.log("Submit create Room");
      console.log("State:",JSON.stringify(this.state))
      const roomService = new RoomService();
      const respStatus = roomService.createRoom(this.state);
      console.log("Create room: ", respStatus)
      event.preventDefault();
  }

    render() {
        return (
          <div>
              <h1>Создать свою комнату</h1>
              <form onSubmit={this.handleSubmit}>
                <select value={this.state.buildType} onChange={this.handleChangeBuildType}>
                    <option value="CUSTOM">Клиентский</option>
                    <option value="DEFAULT">По умолчанию</option>
                </select>
                <select value={this.state.dealCardsType} onChange={this.handleChangeDealCardsType}>
                    <option value="AUTO">Автоматически</option>
                    <option value="HAND">Вручную</option>
                </select>
                <select value={this.state.cardCountType} onChange={this.handleChangeCardCountType}>
                    <option value="FULL">52 карты</option>
                    <option value="SHORT">36 карт</option>
                </select>
                <select value={this.state.type} onChange={this.handleChangeType}>
                    <option value="PUBLIC">Публичная</option>
                    <option value="PRIVATE">Приватная</option>
                </select>
                <input type="number" value={this.state.maxPlayers} onChange={this.handleChangeMaxPlayers}/>
                <input type="number" value={this.state.bet} onChange={this.handleChangeBet}/>
                <input type="submit" value="Создать" />
              </form>
          </div>
        )
      }
}

export default CreateOwnRoom;