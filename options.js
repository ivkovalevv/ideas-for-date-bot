module.exports = {
    ideaOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Получить идею💡', callback_data: 'idea'}]
            ]
        })
    },
    ideaAssessOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Мне нравится! ✅', callback_data: 'like'}, {text: 'Давай другую! ❌', callback_data: 'dislike'}]
            ]
        })
    },
    menuButtons: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Приветствие', callback_data: 'start'}, {text: 'Инфо ℹ️', callback_data: 'info'}, {text: 'Идеи', callback_data: 'getidea'}]
            ]
        })
    },
    startButtons: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Инфо ℹ️', callback_data: 'info'}, {text: 'Идеи 💡', callback_data: 'getidea'}]
            ]
        })
    },
    infoButtons: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Получить идею 💡', callback_data: 'getidea'}]
            ]
        })
    }
}