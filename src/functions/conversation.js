// Constantes
// Noms des items enregistrés dans localStorage
const conversationDataName = "conversations"
const questDataName = "questions"

/**
 * Récupère toutes les conversation
 */
export const getAllConverstions = () => {
    const data = localStorage.getItem(conversationDataName);
    return data && data !== "" ? JSON.parse(data) : [];
}

/**
 * Récupère une conversation par Id
 * @param {string} id Id de la conversation
 */
export const getConversationById = (id) => {
    const list = getAllConverstions();
    return list.find(item => item.id == id);
}

/**
 * Crée une nouvelle conversation
 * @param {string} name Nom de la conversation
 */
export const createConversation = (name = "") => {
    const list = getAllConverstions();

    const newConversation = {
        id: list.length + 1,
        name,
    }

    list.push(newConversation)
    localStorage.setItem(conversationDataName, JSON.stringify(list))

    return newConversation
}

/**
 * Ajoute une question à la liste des questions
 * @param {string} conversationId Id de la conversation en cours
 * @param {Array} newList Le tableau des question de la conversation en cours
 */
export const appendQuestion = (conversationId, newList) => {
    const list = JSON.parse(localStorage.getItem(questDataName));
    const otherQuestions = list.filter(item => item.conversationId !== conversationId);
    localStorage.setItem(questDataName, JSON.stringify([...otherQuestions, ...newList]));
}

/**
 * Récupère la liste des question d'une conversation
 * @param {string} conversationId Id de la conversation en cours
 */
export const getConversationQuestions = conversationId => {
    const list = JSON.parse(localStorage.getItem(questDataName));
    const conversationQuestions = list.filter(item => item.conversationId === conversationId);
    return conversationQuestions;
}