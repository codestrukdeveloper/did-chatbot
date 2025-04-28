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

async function getAgentIntroduction(): Promise<AgentIntroductionData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
      next: {
        revalidate: 86400, 
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

export default async function WebView() {
  const agentIntro = await getAgentIntroduction();

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
          <ChatBox send introData={agentIntro.introduction} />
        </div>
        <p className="text-right mr-2 mt-2">Powered By {agentIntro.poweredBy}</p>
      </div>
    </div>
  );
}
