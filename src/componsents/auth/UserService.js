import axios from 'axios';
import https from 'https';
import {backendUrl} from '../constants/Constants';

class UserService {

    static authUser = null;
    
    async initCurrentUser(token){
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const url = backendUrl + `/user`;
            const response = await axios.get(url, 
            { headers: { Authorization: authToken}},
            { httpsAgent: agent });

            UserService.authUser = response.data;
        }
        return UserService.authUser;
    }

    static getAuthUser(){
        return UserService.authUser;
    }
}

export default UserService;