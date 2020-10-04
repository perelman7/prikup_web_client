import React, { Component } from "react";
import RoomService from "./RoomService";

import "../../style/components/create_own_room.css";

class CreateOwnRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buildType: "DEFAULT",
      maxPlayers: 4,
      isRating: false,
      bet: 10,
      dealCardsType: "AUTO",
      withPenalty: false,
      cardCountType: "SHORT",
      type: "PUBLIC"
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
    console.log("Value:", event.target.value);
    this.setState({ buildType: event.target.value });
  }
  handleChangeDealCardsType(event) {
    console.log("Value:", event.target.value);
    this.setState({ dealCardsType: event.target.value });
  }
  handleChangeCardCountType(event) {
    console.log("Value:", event.target.value);
    this.setState({ cardCountType: event.target.value });
  }
  handleChangeType(event) {
    console.log("Value:", event.target.value);
    this.setState({ type: event.target.value });
  }
  handleChangeMaxPlayers(event) {
    console.log("Value:", event.target.value);
    this.setState({ maxPlayers: event.target.value });
  }
  handleChangeBet(event) {
    console.log("Value:", event.target.value);
    this.setState({ bet: event.target.value });
  }

  async handleSubmit(event) {
    console.log("Submit create Room");
    console.log("State:", JSON.stringify(this.state))
    const roomService = new RoomService();
    roomService.createRoom(this.state);
  }

  render() {
    return (
      <div className="create_container">
        <h1 className="create_header">Создать свою комнату</h1>
        <form className="create_form">
          <div className="row_form">
            <div className="column_form">
              <div className="select_lable">Тип постраения???</div>
              <select className="form_select" value={this.state.buildType} onChange={this.handleChangeBuildType}>
                <option value="CUSTOM">Клиентский</option>
                <option value="DEFAULT">По умолчанию</option>
              </select>
            </div>
            <div className="column_form">
              <div className="select_lable">Тип раздачи карт</div>
              <select className="form_select" value={this.state.dealCardsType} onChange={this.handleChangeDealCardsType}>
                <option value="AUTO">Автоматически</option>
                <option value="HAND">Вручную</option>
              </select>
            </div>
            <div className="column_form">
              <div className="select_lable">Тип колоды</div>
              <select className="form_select" value={this.state.cardCountType} onChange={this.handleChangeCardCountType}>
                <option value="FULL">52 карты</option>
                <option value="SHORT">36 карт</option>
              </select>
            </div>
          </div>

          <div className="row_form">
            <div className="column_form">
              <div className="select_lable">Тип комнаты</div>
              <select className="form_select" value={this.state.type} onChange={this.handleChangeType}>
                <option value="PUBLIC">Публичная</option>
                <option value="PRIVATE">Приватная</option>
              </select>
            </div>
            <div className="column_form">
              <div className="select_lable"> Количество игроков</div>
              <input className="form_number" type="number" value={this.state.maxPlayers} onChange={this.handleChangeMaxPlayers} />
            </div>
            <div className="column_form">
              <div className="select_lable">Ставка</div>
              <input className="form_number" type="number" value={this.state.bet} onChange={this.handleChangeBet} />
            </div>
          </div>
          <button className="form_button" onClick={this.handleSubmit}>Создать</button>
        </form>
      </div>
    )
  }
}

export default CreateOwnRoom;