
import Image from "next/image";

const AgentExportSelection = () => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Agent Export</h2>

      <div className="space-y-3">
        {/* Web View */}
        <label className="flex items-center justify-between p-3 border rounded-[10px] cursor-pointer h-[60px]">
          <span className="text-gray-700">Web View</span>
          <input
            type="checkbox"
            style={{accentColor:"#324168"}}
            
            readOnly
            className="form-checkbox h-5 w-5 text-blue-600 mr-3"
          />
        </label>

        {/* WhatsApp Chatbot */}
        <label className="flex items-center form-checkbox justify-between p-3 border rounded-[10px] cursor-pointer h-[60px]">
          <span className="text-gray-400">Whatsapp Chatbot</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 mr-3" style={{accentColor:"#324168"}}
          />
        </label>

        {/* Website Embedded Chatbot */}
        <label className="flex items-center form-checkbox justify-between p-3 border rounded-[10px] cursor-pointer h-[60px]">
          <span className="text-gray-400">Website Embedded Chatbot</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-700 mr-3" style={{accentColor:"#324168"}}
          />
        </label>
      </div>

      {/* Divider */}
      <div className="border-blue-300 my-6"></div>

      {/* Robot Image */}
      <div className="flex justify-center">
        <Image
          src="/png/robot.png" // Place your robot image in /public/robot.png
          alt="Chatbot"
          width={450}
          height={450}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default AgentExportSelection;
