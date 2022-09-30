const TelegramBot = require('node-telegram-bot-api');

const telegramBot = new TelegramBot('5349249276:AAG84e6Xv0tLhmRzmNvja1D01IwyCKLW2RI', {polling: true});
// const telegramBot = new TelegramBot(process.env.TELEGRAM_API, {polling: true});

module.exports = telegramBot;