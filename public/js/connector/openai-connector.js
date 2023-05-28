

/**
 * Shared function to call open api
 * @param {*} typeApi 
 * @param {*} payloadString 
 * @param {*} handleCallback 
 */
function callOpenApi(typeApi, payloadString, handleCallback) {
    fetch('api/js-helper.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'function=' + typeApi + '&payload=' + payloadString
    })
        .then(response => response.text())
        .then(responseData => {
            handleCallback(responseData)
            return responseData;
        })
        .catch(error => {
            const messageDisplay = window.neoncyberpanda.OPENAI_FAILURE_EMPTY_RESPONSE;
            handleCallback(messageDisplay, CHAT_BOT)
            const messageDisplay2 = window.neoncyberpanda.OPENAI_FAILURE_EMPTY_RESPONSE2 + " " + error.message;
            handleCallback(messageDisplay2, CHAT_BOT)
            return messageDisplay;
        });
}

/**
 * Call chat completion api at backend
 * @param {*} message 
 * @param {*} model 
 */
const chatCompletionStatusApi = async (message, model) => {
    await callOpenApi('chatCompletionStatusApi',
        JSON.stringify({
            message: message,
            model: model

        }),
        (responseData) => { addMessage(responseData, CHAT_BOT) })

};

/**
 * Call completion api at backend
 * @param {*} message  
 */
const chatStatusApi = async (message, model) => {
    await callOpenApi('chatStatusApi',
        JSON.stringify({
            message: message,
            model: model
        }),
        (responseData) => { addMessage(responseData, CHAT_BOT) })
};


/**
 * Call image generation api at backend
 * @param {*} message 
 */
const chatImageStatusApi = async (message) => {
    await callOpenApi('chatImageStatusApi',
        JSON.stringify({
            message: message
        }),
        (responseData) => {
            try {
                const responseDataJson = JSON.parse(responseData)
                addImageMessage(responseDataJson, CHAT_BOT)
            } catch (e) {
                addMessage(responseData, CHAT_BOT)
            }

        })

};
