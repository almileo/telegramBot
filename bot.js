const dotenv = require('dotenv')
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

dotenv.config()

const telegramBot = new TelegramBot(process.env.TELEGRAM_API, {polling: true});
const TELEGRAM_CHAT_ID = -492958742

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('chat_id: ', process.env.TELEGRAM_CHAT_ID);
    res.status(200).send('The server is running').end();
})

app.listen(PORT, () => {
    console.log('Server is running');
    console.log(`App listening on port ${PORT}`);
})

telegramBot.on("polling_error", (msg) => console.log('Error Telegram: ', msg));


telegramBot.addListener("message", (msg) => {
    console.log('msg - addListener: ', msg.text);
    if(msg.text === '/arbitraje'){
        console.log(`Este es comando ${msg.text}`);
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, `aca se retransmitiria el msg anterior`);
    }
})  

app.post('/alert', (req, res) => {
    console.log('req: ', req.body.msg);
    res.status(200).send('Ya mande el mensaje').end();
})

