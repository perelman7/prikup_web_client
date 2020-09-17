import axios from 'axios';
import https from 'https';
import {getToken} from "../FirebaseConfig"

class RoomService {
    
    async getRooms(){
        let listRooms = [];
        const token = getToken();
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.get(`http://localhost:8080/room?limit=10`, 
            { headers: { Authorization: authToken}},
            { httpsAgent: agent });

            listRooms = response.data;
            console.log("ROOMS: ", listRooms)
        }
        return listRooms;
    }

    async enterToRoom(roomId){
        let status = null;
        const token = await getToken();
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.post(`http://localhost:8080/room/enter?roomId=` + roomId, null,
            { headers: { Authorization: authToken}},
            { httpsAgent: agent });

            status = response.status;
            console.log("Status enter to room: ", status)
        }
        return status;
    }

    async createRoom(requestModel){
        let respStatus = null;
        const token = await getToken();
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.post(`http://localhost:8080/room`, JSON.stringify(requestModel),
            { 
                headers: { 
                    Authorization: authToken,
                    'Content-Type': 'application/json'
                },
            },
            { httpsAgent: agent });
    
            respStatus = response.status;
            console.log("Resp status for create room: ", respStatus);
        }
        return respStatus;
    }
}

export default RoomService;