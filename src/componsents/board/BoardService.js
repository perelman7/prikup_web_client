import axios from 'axios';
import https from 'https';
import {getToken} from "../FirebaseConfig";
import {backendUrl} from '../constants/Constants';

class BoardService {

    async sendAction(action){
        let respStatus = null;
        const token = await getToken();
        const url = backendUrl + "/api/action";
        console.log("ACTION URL: ", url);
        if(token !== null && action !== null){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({
                rejectUnauthorized: false
            });
            const response = await axios.post(url, JSON.stringify(action),
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

export default BoardService;