import { useNavigate } from "react-router-dom";
import { createConversation } from "./conversation";

export const useConversations = () => {
    const navigate = useNavigate();

    const handleCreateConversation = () => {
        const conversation = createConversation();
        navigate(conversation.id?.toString());
    };

    return {
        handleCreateConversation
    }
}