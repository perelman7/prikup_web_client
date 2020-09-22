import axios from 'axios';
import https from 'https';

class CardService {

    async initCardDeck(token){
        if(token){
            const authToken = 'Bearer ' + token;
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const response = await axios.get(`http://localhost:8080/card`, 
            { headers: { Authorization: authToken}},
            { httpsAgent: agent });

            let cardDeck = response.data;
            console.log("Cards: ", cardDeck);
            window.sessionStorage.setItem("cardDeck", JSON.stringify(cardDeck));
        }
    }
}

export default CardService;