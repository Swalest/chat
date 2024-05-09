import React from "react";
import ChatInputMedia from "media/ChatInputMedia";

const ChatInput = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center w-full">
      <label for="prompt" className="sr-only">
        Prompt
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="prompt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-7  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Entrer votre prompt ici ..."
          required
          onChange={onChange}
          value={value}
        />

        <div className="absolute inset-y-0 end-0 flex items-center pe-3">
          <ChatInputMedia />
        </div>
      </div>

      <button type="submit" className="sr-only" />
    </form>
  );
};

export default ChatInput;
