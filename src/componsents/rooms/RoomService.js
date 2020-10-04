import axios from 'axios';
import https from 'https';
import {getToken} from "../FirebaseConfig";
import {backendUrl} from '../constants/Constants';

class RoomService {
    
    async getRooms(){
        let listRooms = [];
        const token = getToken();
        
        const url = backendUrl + `/api/room?limit=10`;
        console.log("ROOM GET URL: ", url);
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            
            const response = await axios.get(url, 
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
        const url = backendUrl + `/api/room/enter?roomId=` + roomId;
        console.log("ROOM ENTER URL: ", url);
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.post(url, null,
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

        const url = backendUrl + "/api/room";
        console.log("ROOM create URL: ", url);
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.post(url, JSON.stringify(requestModel),
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