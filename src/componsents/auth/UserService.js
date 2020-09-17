import axios from 'axios';
import https from 'https';

class UserService {

    static authUser = null;
    
    async initCurrentUser(token){
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.get(`http://localhost:8080/user`, 
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