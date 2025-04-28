export default function ChatMessage({ sender, text }: { sender: string; text: string }) {
  if (text == "") {
    return;
  }
  const isBot = sender === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`rounded-xl px-4 py-2 max-w-xs md:max-w-md lg:max-w-lg border ${isBot ? 'bg-white text-black' : 'bg-white text-black'
          }`}
      >
        {text}
      </div>
    </div>
  );
};