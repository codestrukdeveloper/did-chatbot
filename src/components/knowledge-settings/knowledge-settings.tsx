"use client";
import React from 'react';


export default function AgentSettings() {
    const [selectedSource, setSelectedSource] = React.useState<string>("Grounded");
    const [creativityLevel, setCreativityLevel] = React.useState(50);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreativityLevel(parseInt(e.target.value));
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <h2 className='text-xl font-semibold mb-2'>Knowledge Settings</h2>
            <p className='text-gray-500'>
                Choose whether the agent sticks to provided info or includes broader insights.
            </p>
            <div className="space-y-4 mt-6">
                {knowledgeSources.map((source) => (
                    <div key={source.id}>
                        <div  className={`cursor-pointer w-full border-[1.7px] border-[#e5e5e5] rounded-[10px] p-4 mb-4 ${selectedSource === source?.name ? "border-[#324168]" : ""}`} onClick={() => setSelectedSource(source.name)}>
                            <h3 className='font-semibold'>{source.name}</h3>
                            <p className="text-sm text-gray-500 text-sm mt-2">{source.desc}</p>
                        </div>
                        {selectedSource === source?.name && selectedSource !== "Ungrounded" &&
                            <div className="p-6 bg-[#f4f4f4] rounded-xl">
                                <h3 className='text-lg font-semibold pb-4 border-b'>Adjust Creativity Level</h3>
                                <div className='grid grid-cols-[1fr_2fr_1fr] gap-4 items-center pt-4'>
                                    <span className="text-sm font-medium text-gray-700">More predictable and focused</span>


                                    <div className="relative">
                                        {/* Slider track */}
                                        <div className="h-2 bg-white rounded-full">
                                            {/* Filled portion */}
                                            <div
                                                className="h-2 bg-blue-900 rounded-full"
                                                style={{ width: `${creativityLevel}%` }}
                                            ></div>
                                        </div>

                                        {/* Slider thumb */}
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={creativityLevel}
                                            onChange={handleSliderChange}
                                            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                        />

                                        {/* Custom thumb */}
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-900 rounded-full shadow-md"
                                            style={{ left: `calc(${creativityLevel}% - 8px)` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">More diverse and creative</span>
                                </div>

                                {/* Optional: Display current value */}
                                <div className="mt-2 text-center text-xs text-gray-500">
                                    Creativity level: {creativityLevel}%
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
const knowledgeSources = [
    { id: 1, name: 'Grounded', desc: "Choose it you need your agent to stay strictly within provided knowledge" },
    { id: 2, name: 'Hybrid', desc: "Choose for a more conversational tone, where the agent can interpret the facts" },
    { id: 3, name: 'Ungrounded', desc: "Relies only on its own knowledge base, ignoring uploaded data" },
]