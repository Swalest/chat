import { useNavigate } from "react-router-dom";
import { createConversation, getAllConverstions } from "./conversation";
import { useEffect, useState } from "react";

export const useConversations = () => {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);

    const handleCreateConversation = () => {
        const conversation = createConversation();
        setConversations(conversations => ([conversation, ...conversations]))
        navigate(conversation.id?.toString());
    };

    useEffect(() => {
        setConversations(getAllConverstions());
    }, []);

    return {
        handleCreateConversation,
        conversations
    }
}