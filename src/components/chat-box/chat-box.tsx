"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ChatMessage from '../chat-messages/chat-messages';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatBoxProps {
  send?: boolean;
  introData?: string;
  apiKey:string;

}

export default function ChatBox({ send = false, introData = '',apiKey }: ChatBoxProps) {
  const initialMessages: Message[] = introData ? [{ sender: 'bot', text: introData.trim() }] : [];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }, { sender: 'bot', text: '' }]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let tempBotText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        const lines = chunkValue.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const token = line.replace('data: ', '');
            if (token === '[DONE]') {
              setIsLoading(false);
              return;
            }
            

            tempBotText += token;

            setMessages(prev => {
              const updatedMessages = [...prev];
              const lastIndex = updatedMessages.length - 1;
              updatedMessages[lastIndex] = {
                ...updatedMessages[lastIndex],
                text: tempBotText.trim(),
              };
              return updatedMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error streaming message:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I encountered an error while processing your request.' }]);
      setIsLoading(false);
    }
  }
    ;


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 rounded-lg">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-xl px-4 py-2 bg-white text-black border">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border rounded-lg px-4 py-2 flex items-center bg-white">
        <input
          type="text"
          placeholder="Type Here..."
          className="flex-1 px-2 py-1 outline-none bg-transparent"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {!send ? (
          <button className="text-blue-600 hover:text-blue-800">
            <Image src="/svg/mic.svg" alt="mic" width={28} height={28} />
          </button>
        ) : (
          <button
            className="bg-[#324168] w-[32px] h-[32px] rounded-full flex items-center justify-center"
            onClick={handleSendMessage}
            disabled={isLoading || inputValue.trim() === ''}
          >
            <Image src="/png/send.png" alt="send" width={20} height={20} className="mt-[2px]" />
          </button>
        )}
      </div>
    </div>
  );
}
