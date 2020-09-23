import axios from 'axios';
import https from 'https';
import {getToken} from "../FirebaseConfig"

class BoardService {

    async sendAction(action){
        let respStatus = null;
        const token = await getToken();
        if(token !== null && action !== null){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.post(`http://localhost:8080/action`, JSON.stringify(action),
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