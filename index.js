const TelegramApi = require('node-telegram-bot-api');
const TOKEN = '6629118245:AAFbRUnAJQExcgDHaHTbixaPA3xoC1u2xqY';
const bot = new TelegramApi(TOKEN, {polling: true});

const {ideaOptions, ideaAssessOptions, menuButtons, startButtons, infoButtons} = require('./options')
const ideas = require('./ideas.json')
let ideasLength = Object.keys(ideas).length;

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о боте'},
    {command: '/getidea', description: 'Получить идею для свидания'},
]);

const setIdea = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я подарю тебе идею для свидания!`, ideaOptions);
}

const getIdea = async (chatId, index) => {
    const idea = `idea_${index}`;
    const text = ideas[idea].text;
    const photo = ideas[idea].photo;

    return bot.sendPhoto(chatId, photo, {"reply_markup":{"inline_keyboard":[[{"text":"Мне нравится! ✅","callback_data":"like"}, {"text":"Давай другую! ❌","callback_data":"dislike"}]]}, caption: text});
}

const setLike = async (chatId) => {
    await bot.sendMessage(chatId, `Рад, что смог тебе помочь!`);
    setTimeout(() => {
        bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Kittydogs/Kittydogs_003.webp');
    }, 500)
}

const start = () => {
    let index = 0;
    /* let index = Math.floor(Math.random() * ideasLength); */
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const textInfo = `IdeasForDate_Bot - это ваш личный помощник по идеям для свиданий.✨\n\nОн может предложить вам уникальные и интересные идеи для свиданий, которые позволят вам и вашему партнеру провести незабываемый вечер вместе.\n\nКоманды:\n/start - Приветствие\n\n/info - Информация о боте и его основные команды\n\n/getidea - Запуск генерации идей для свидания\n\nПопробуйте! Вы обязательно найдете что-то интересное💡`
    
        if(text === '/start' || text === 'Привет'){
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Kittydogs/Kittydogs_001.webp');
            return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!\nДобро пожаровать в телеграм бот с идеями для свиданий!`, startButtons);
        } else if(text === '/info' || text === 'Инфо'){
            return bot.sendMessage(chatId, textInfo, infoButtons);
        } else if(text === '/getidea' || text === 'Получить идею'){
            return setIdea(chatId);
        } else {
            return bot.sendMessage(chatId, 'Извини, я тебя не понял😢\nВоспользуйся кнопками из меню ⤵️', menuButtons);
        }
        
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        // bot.sendMessage(chatId, index);
        /* let index = Math.floor(Math.random() * ideasLength); */
        const textInfo = `IdeasForDate_Bot - это ваш личный помощник по идеям для свиданий.✨\n\nОн может предложить вам уникальные и интересные идеи для свиданий, которые позволят вам и вашему партнеру провести незабываемый вечер вместе.\n\nКоманды:\n/start - Приветствие\n\n/info - Информация о боте и его основные команды\n\n/getidea - Запуск генерации идей для свидания\n\nПопробуйте! Вы обязательно найдете что-то интересное💡`

        if(data === 'idea'){
            if(index >= ideasLength) {
                return bot.sendMessage(chatId, 'У меня закончились идеи😢\nПопробуйте что-то из предложенных вариантов, а я пока придумаю ещё🤔');
            } else {
                return getIdea(chatId, index);
            }
            /* return getIdea(chatId, index); */
        } else if(data === 'dislike'){
            index++
            if(index >= ideasLength) {
                return bot.sendMessage(chatId, 'У меня закончились идеи😢\nПопробуйте что-то из предложенных вариантов, а я пока придумаю ещё🤔');
            } else {
                return getIdea(chatId, index)
            }
            /* return getIdea(chatId, index); */
        } else if(data === 'like'){
            return setLike(chatId)
        } else if(data === 'start'){
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/Kittydogs/Kittydogs_001.webp');
            return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!\nДобро пожаровать в телеграм бот с идеями для свиданий!`);
        } else if(data === 'info'){
            return bot.sendMessage(chatId, textInfo, infoButtons);
        } else if(data === 'getidea'){
            return setIdea(chatId);
        } else {
            return;
        }
    });
};

start();