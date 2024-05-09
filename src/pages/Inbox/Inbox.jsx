import React, { useEffect, useState } from "react";
import ChatInput from "../../components/ChatInput/ChatInput";
import { useParams } from "react-router-dom";
import {
  appendQuestion,
  getConversationById,
  getConversationQuestions,
} from "../../functions/conversation";
import { Avatar } from "auth/Avatar";
import { useChatWithGemini } from "ai_chat/functions";

export const Inbox = () => {
  const { conversationId } = useParams();

  const [conversation, setConversation] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [prompt, setPrompt] = useState("");

  // Récupération des outils IA pour le chat
  const { stream, getResponse } = useChatWithGemini();
  // La fonction de soumission
  // du prompt (question)
  const handleCommit = e => {
    e.preventDefault();
    // Envoie de la question
    // Pour la récupération de la reponse
    getResponse(prompt);
    // Mis à jour de la liste des questions
    setQuestions(questions => [
      ...questions,
      {
        id: questions.length + 1,
        conversationId,
        prompt,
        answer: "",
      },
    ]);
    // Réinitialisation du champs de saisie
    setPrompt("");
  };

  useEffect(() => {
    // Récupération de la conversation
    const conversation = getConversationById(conversationId);
    setConversation(conversation);

    // Récupération des questions de la conversation
    const questions = getConversationQuestions(conversationId);
    setQuestions(questions);
  }, [conversationId]);

  useEffect(() => {
    // Mis à jour en cascade de la réponse
    // La réponse vient sous forme des chunks
    if (stream) {
      const qs = [...questions];
      const q = qs[questions.length - 1];
      q["answer"] = stream;

      setQuestions(qs);
      appendQuestion(conversationId, qs);
    }
  }, [stream]);

  return (
    <div className="px-10 max-w-3xl mx-auto h-[100vh] flex flex-col">
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

            {questions.map(question => (
              <div className="mt-7 space-y-7">
                <div className="text-base text-gray-600 flex gap-4">
                  <Avatar />
                  <span className="mt-2">{question.prompt}</span>
                </div>

                <div className="text-base text-gray-600 flex gap-4 ml-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                  </span>
                  <span>{question.answer}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 py-10 bg-white">
        <ChatInput
          onSubmit={handleCommit}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
      </div>
    </div>
  );
};
