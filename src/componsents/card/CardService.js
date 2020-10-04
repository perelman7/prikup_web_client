import axios from 'axios';
import https from 'https';
import {backendUrl} from '../constants/Constants';

class CardService {

    async initCardDeck(token){
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const url = backendUrl + `/card`;
            const response = await axios.get(url, 
            { headers: { Authorization: authToken}},
            { httpsAgent: agent });

            let cardDeck = response.data;
            console.log("Cards: ", cardDeck);
            window.sessionStorage.setItem("cardDeck", JSON.stringify(cardDeck));
        }
    }
}

export default CardService;