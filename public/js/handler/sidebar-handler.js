

const setActiveModelMenu = (uniqueId) => {
    const foundActiveSelections = modelSelector.getElementsByClassName(CLASS_MODEL_MENU + " " + CLASS_ACTIVE);
    foundActiveSelections[0].classList.remove(CLASS_ACTIVE)
    getDomById(uniqueId).classList.add(CLASS_ACTIVE)

}
const getModelValue = () => {
    const foundActiveSelections = modelSelector.getElementsByClassName(CLASS_MODEL_MENU + " " + CLASS_ACTIVE);
    return foundActiveSelections[0].dataset.value
}
const getModelLabel = () => {
    const foundActiveSelections = modelSelector.getElementsByClassName(CLASS_MODEL_MENU + " " + CLASS_ACTIVE);
    return foundActiveSelections[0].innerHTML
}
const toggleSidebarMenu = () => {
    sidebarDom.classList.toggle(CLASS_ACTIVE)
    chatContainer.classList.toggle(CLASS_ACTIVE)

}
const handleModelChange = (uniqueId) => {
    setActiveModelMenu(uniqueId)
    const text = getModelLabel()
    const modelValue = getModelValue()

    const messageContainer = document.createElement("div");
    messageContainer.classList.add(CLASS_CHAT_WARNING);

    const hrItem = document.createElement("hr");
    const messageText = document.createElement("p");
    messageText.textContent = window.neoncyberpanda.OPENAI_WARNING_MODEL_CHANGE.replace(window.neoncyberpanda.OPENAI_MODEL_TOKEN, text)
    messageContainer.appendChild(messageText);


    const messageContainer2 = document.createElement("div");
    messageContainer2.classList.add(CLASS_CHAT_WARNING2);
    const messageText2 = document.createElement("p");
    messageText2.textContent = window.neoncyberpanda.OPENAI_WARNING_MODEL_CHANGE2;
    messageContainer2.appendChild(messageText2);

    chatMessages.appendChild(hrItem);
    chatMessages.appendChild(messageContainer);
    chatMessages.appendChild(messageContainer2);

    if (modelValue === window.neoncyberpanda.OPENAI_API_MODEL_IMAGE) {
        addMessage(window.neoncyberpanda.OPENAI_API_MODEL_IMAGE_TIP, CHAT_BOT);
    }


}  