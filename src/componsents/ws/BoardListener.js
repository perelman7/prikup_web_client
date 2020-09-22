import React, { Component } from "react";
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket";
import UserService from "../auth/UserService";

let stompClient = null;

class BoardListener extends Component{

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

            let url = '/board/state';
            if(user != null){
                url = '/board/state/' + user.id;
            }
            console.log('URL: ', url);
            stompClient.subscribe(url, function (greeting) {
                const body = greeting.body;
                console.log("Board: ", body);
                redirect(body);
            });
        });
    }

    handleRedirect(newBoard){
        // const json = JSON.stringify(newBoard);
        window.location.href = '/board';
        window.sessionStorage.setItem('selectedBoard', newBoard);
        window.sessionStorage.removeItem('selectedRoom');
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

export default BoardListener;
