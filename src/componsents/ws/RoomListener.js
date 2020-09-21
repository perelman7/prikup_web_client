import React, { Component } from "react";
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket";
import UserService from "../auth/UserService";

let stompClient = null;

class RoomListener extends Component{

    constructor(props){
        super(props);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);

        this.handleRedirect = this.handleRedirect.bind(this);
    }

    async connect() {
        let user = UserService.getAuthUser();
        var socket = new SockJS('http://localhost:8080/prikup-room');

        const redirect = this.handleRedirect;

        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            
            let url = '/room/state/';
            if(user != null){
                url = '/room/state/' + user.id;
            }
            
            console.log('URL: ', url);
            stompClient.subscribe(url, function (greeting) {
                const body = JSON.parse(greeting.body);
                console.log("Room: ", body);
                redirect(body);
            });
        });
    }

    handleRedirect(newRoom){
        const json = JSON.stringify(newRoom);
        console.log("JSON :", json);
        window.location.href = '/room';
        window.sessionStorage.setItem('selectedRoom', json);
    }

    componentDidMount = () => {
        this.connect();
    }

    disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    render() {
        return (<div></div>)
    }
}

export default RoomListener;
