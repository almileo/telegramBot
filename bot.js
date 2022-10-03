const dotenv = require('dotenv')
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const TelegramBot = require('node-telegram-bot-api');

dotenv.config()

const TELEGRAM_API='5349249276:AAG84e6Xv0tLhmRzmNvja1D01IwyCKLW2RI'

setInterval(async () => {
    try {
        console.log('setInterval para que no se duerma el servidor en render');
        await axios.get(`https://telegram-arbitraje.onrender.com/`);
    } catch (error) {
        console.log('Error: ', error)   
    }
}, 60000); // 10 minutes

const telegramBot = new TelegramBot(TELEGRAM_API);

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('I am still awake');
    res.status(200).send('The server is running').end();
})

app.listen(PORT, () => {
    console.log('Server is running');
    console.log(`App listening on port ${PORT}`);
})

telegramBot.on("polling_error", (msg) => console.log('Error Telegram: ', msg));


telegramBot.addListener("message", (msg) => {
    console.log('msg - addListener: ', msg.text);
    if(msg.text === '/bot'){
        console.log(`Este es comando ${msg.text}`);
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, `aca se retransmitiria el msg anterior`);
    }
})  

app.post('/alert', (req, res) => {
    console.log('req: ', req.body.msg);
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, req.body.msg);
    res.status(200).send('Ya mande el mensaje').end();
})

