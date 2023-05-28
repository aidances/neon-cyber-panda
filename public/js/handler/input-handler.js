

const handleSubmission = (event) => {
    event.preventDefault();
    const message = chatInput.value || '';
    addMessage(message, CHAT_USER);

    addMessage(window.neoncyberpanda.OPENAI_PROCESSING_MESSAGE, CHAT_BOT);
    chatInput.value = "";

    const modelValue = getModelValue()
    const modelInputMessage = (message + "").toLowerCase()
    // CALL API

    // DAll-E model
    if (hasMatch(modelInputMessage, window.neoncyberpanda.OPENAI_API_MODEL_MAGIC_PROMPT) ||
        window.neoncyberpanda.OPENAI_IMAGE_LIST.includes(modelValue)
    ) {
        const enrichedMessage = message.replace(window.neoncyberpanda.OPENAI_API_MODEL_MAGIC_PROMPT, '')
        return chatImageStatusApi(enrichedMessage);
    }
    // chat completion for 3.5 and 4 model
    if (
        window.neoncyberpanda.OPENAI_CHAT_COMPLETION_LIST.includes(modelValue)) {
        return chatCompletionStatusApi(message, modelValue);
    }
    // chat completion for 3 below
    if (
        window.neoncyberpanda.OPENAI_COMPLETION_LIST.includes(modelValue)) {
        return chatStatusApi(message, modelValue);
    }



}
const initializeEnterSubmission = () => {
    chatForm.addEventListener("submit", async (event) => {
        handleSubmission(event)
    });

    chatInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            handleSubmission(event);
        }
    });

}

