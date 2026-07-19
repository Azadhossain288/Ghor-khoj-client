import ChatWidget from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-10 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-primary">AI Property Assistant</h1>
      <ChatWidget />
    </div>
  );
}
