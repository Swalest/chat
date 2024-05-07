import React, { useEffect, useState } from "react";
import ChatInput from "../../components/ChatInput/ChatInput";
import { useParams } from "react-router-dom";
import { getConversationById } from "../../functions/conversation";

export const Inbox = () => {
  const { conversationId } = useParams();

  const [conversation, setConversation] = useState(null);

  console.log(conversation);

  useEffect(() => {
    const conversation = getConversationById(conversationId);
    setConversation(conversation);
  }, [conversationId]);

  return (
    <div className="px-10 max-w-4xl mx-auto h-[100vh] flex flex-col">
      <div className="flex-1">
        {!conversation ? (
          <div>
            <p>Aucune conversation ne correspond à ce numéro !</p>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <h2 className="text-2xl">Conversation #{conversation.id}</h2>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 py-10 bg-white">
        <ChatInput />
      </div>
    </div>
  );
};
