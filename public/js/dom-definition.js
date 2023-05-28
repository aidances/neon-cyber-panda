
/**
 * This file defines all the JS CSS html level variables. 
 * You can change them here if you want another name.
 *  - used classes
 *  - base helper method
 */
const CHAT_WELCOME_MESSAGE = window.neoncyberpanda.welcomeMessage;
const CHAT_OFFLINE_MESSAGE = window.neoncyberpanda.offlineMessage;
const CLASS_CHAT_MESSAGE = "chat-message";
const CLASS_CHAT_WARNING = "chat-message-warning";
const CLASS_CHAT_WARNING2 = "chat-message-warning2";
const CLASS_CHAT_TYPEWRITER = "typewriter";
const CLASS_MODEL_MENU = "model-menu";
const CLASS_IMAGE_GENERATED = "image-generated";
const CLASS_CHAT_TIME = "time";
const CLASS_ACTIVE = "active";
const CLASS_DOWNLOAD = "download";
const CLASS_HIDDEN = "hidden";

const CHAT_BOT = "bot";
const CHAT_USER = "user";



const getDomById = (domId) => {
    return document.getElementById(domId);
}
const hasMatch = (messageText, finderPattern) => {
    return messageText.indexOf(finderPattern) > -1;
}


const mainBody = getDomById("main-body");
const chatMessages = getDomById("chat-messages");
const chatInput = getDomById("chat-input");
const chatForm = getDomById("chat-form");
const chatContainer = getDomById("chat-body");
const chatModule = getDomById("chat-module");
const modelSelector = getDomById("model-select")
const errorMessageDom = getDomById("error-message")
const sidebarDom = getDomById("sidebar-menu")


