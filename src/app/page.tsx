import ChatBox from "@/components/chat-box/chat-box";
import Image from "next/image";

interface AgentIntroductionData {
  agentName: string;
  poweredBy: string;
  companyLogo: string;
  companyIntroVideo: string;
  companyName: string;
  companyDescription: string;
  introduction: string;
}

async function getAgentIntroduction(apiKey: string): Promise<AgentIntroductionData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      next: {
        revalidate: 86400, // cache for 1 day
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error('Failed to fetch agent intro');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching agent intro:', error);
    return {
      agentName: 'Default AI',
      poweredBy: 'Knowledge Excel',
      companyLogo: '/png/logo.png',
      companyIntroVideo: '',
      companyName: 'Knowledge Excel',
      companyDescription: 'Knowledge platform',
      introduction: 'Hello! I am your AI assistant. Feel free to ask anything!',
    };
  }
}

export default async function WebView({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const id = await searchParams;

  if (!id?.id) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">API Key Missing</h1>
          <p className="text-gray-700 mb-6">
            Please provide a valid API key in the URL to load the chatbot.
          </p>
          <div className="text-sm text-gray-400">
            Example: <code className="bg-gray-100 p-1 rounded">?id=YOUR_API_KEY</code>
          </div>
        </div>
      </div>
    );
  }

  const apiKey = id.id;
  const agentIntro = await getAgentIntroduction(apiKey);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[550px] w-full space-y-2">
        <Image
          src={agentIntro.companyLogo}
          alt="company logo"
          width={180}
          height={60}
          className="bg-white p-2 mr-auto"
        />
        <div className="bg-[#F7F8FA] rounded-xl z-[999999] z-10 h-[90%]">
          <ChatBox send introData={agentIntro.introduction} apiKey={id.id} />
        </div>
        <p className="text-right mr-2 mt-2">Powered By {agentIntro.poweredBy}</p>
      </div>
    </div>
  );
}
