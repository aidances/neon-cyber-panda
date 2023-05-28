

/**
 * Scroll down chat
 * @param {*} customContainer 
 * @returns 
 */
const doScroll = (customContainer) => {
    if (!customContainer) return
    setTimeout(() => {
        chatMessages.scrollIntoView(false);
        customContainer.scrollIntoView(false);
        chatMessages.scrollIntoView(false);
    }, 500);
}
/**
 * Get current time
 * @returns display time hh:mm
 */
const getTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
/**
 * Download bot response as a file text
 * @param {*} messageContent 
 */
const downloadMessageAsFile = (messageContent) => {
    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([messageContent], { type: 'text/plain' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "message.txt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
}
/**
 * Add display message chat bubbles
 * @param {messagecontent} text 
 * @param {*} sender 
 */
const addMessage = (text, sender) => {
    text = text || '....'
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(CLASS_CHAT_MESSAGE);

    const messageText2 = document.createElement("p");
    messageText2.innerHTML = "<small>" + window.neoncyberpanda.OPENAI_DOWNLOAD_TEXT + "</small>"
    messageText2.classList.add(CLASS_HIDDEN, CLASS_DOWNLOAD);
    messageText2.onclick = () => { downloadMessageAsFile(text) }

    const messageText = document.createElement("p");
    messageText.innerHTML = text.replace(/\n/g, "<br /><br />");
    messageText.onclick = () => { messageText2.classList.toggle(CLASS_HIDDEN) }


    const timeText = document.createElement("span");
    timeText.classList.add(CLASS_CHAT_TIME)
    timeText.textContent = getTime();

    messageContainer.appendChild(messageText);
    messageContainer.appendChild(messageText2);
    messageContainer.appendChild(timeText);
    chatMessages.appendChild(messageContainer);

    doScroll(messageContainer);

    if (sender === CHAT_BOT) messageContainer.classList.add(CLASS_CHAT_MESSAGE, CHAT_BOT, CLASS_CHAT_TYPEWRITER);
    else if (sender === CHAT_USER) messageContainer.classList.add(CLASS_CHAT_MESSAGE, CHAT_USER);
    // focus back on input
    setTimeout(() => {
        chatInput.focus();
    }, 1000);
}


/**
 * Function to add a message to the chat interface
 * @param {*} payloadItem 
 * @param {*} sender 
 * @returns 
 */
const addImageMessage = (payloadItem, sender) => {
    if (!payloadItem.data || !payloadItem.data.length) {
        return
    }
    let messageContainer = document.createElement("div");
    for (let ii = 0; ii < payloadItem.data.length; ii++) {
        const itemData = payloadItem.data[ii]
        messageContainer = document.createElement("div");
        messageContainer.classList.add(CLASS_CHAT_MESSAGE);

        const imageContent = document.createElement("img");
        imageContent.src = itemData.url
        imageContent.onclick = () => { window.open(itemData.url, '_blank') }
        imageContent.classList.add(CLASS_IMAGE_GENERATED)

        const messageText = document.createElement("p");
        messageText.innerHTML = ii + 1;
        const timeText = document.createElement("span");
        timeText.classList.add(CLASS_CHAT_TIME)
        timeText.textContent = getTime();

        messageContainer.appendChild(imageContent);
        messageContainer.appendChild(timeText);
        chatMessages.appendChild(messageContainer);

        doScroll(messageContainer);
    }


    if (sender === CHAT_BOT) {
        messageContainer.classList.add(CLASS_CHAT_MESSAGE, CHAT_BOT,
            CLASS_CHAT_TYPEWRITER);
    } else if (sender === CHAT_USER) {
        messageContainer.classList.add(CLASS_CHAT_MESSAGE, CHAT_USER);
    }
    setTimeout(() => {
        chatInput.focus();
        doScroll(messageContainer);
    }, 1000);
}