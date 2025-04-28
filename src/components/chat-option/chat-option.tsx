"use client"
import React from "react";
import CustomInput from "../custom-input/custom-input";

export default function ChatOption() {
    const [selectedOption, setSelectedOption] = React.useState(1);
    const [isDragging, setIsDragging] = React.useState(false);
    const [fileName, setFileName] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFileName(e.dataTransfer.files[0].name);
            // Handle file upload logic here
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            // Handle file upload logic here
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    return (
        <section className="w-full px-4">
            <h2 className="font-semibold text-xl mb-6">Knowledge Sources</h2>
            <div className="flex gap-4 justify-between">
                {knowledgeSources.map((item) => (
                    <div key={item.id} className={`cursor-pointer w-full border border-[#e5e5e5] rounded-[10px] p-4 ${selectedOption === item?.id ? "bg-[#324168] text-white" : ""}`} onClick={() => setSelectedOption(item.id)}>
                        <p className="text-sm text-sm w-full text-center">{item.tabOption}</p>
                    </div>
                ))}
            </div>
            {knowledgeSources.map((item) => (
                <div key={item?.id}>
                    {item?.id === selectedOption && selectedOption === 1 &&
                        <div className="mt-6">
                            <textarea name="knowledge" id="knowledge" rows={6} placeholder="Text here..." className="w-full p-4 border border-[#e5e5e5] rounded-[10px] focus:outline-none"></textarea>
                        </div>
                    }
                    {item?.id === selectedOption && selectedOption === 2 &&
                        <div className="mt-6">
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragEnter={handleDragEnter}
                                onDragOver={(e) => e.preventDefault()}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={triggerFileInput}
                            >
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        .txt, .pdf, .xlsx, .docx, website
                                    </p>
                                    {fileName && (
                                        <p className="text-sm text-gray-700 mt-2">
                                            Selected file: <span className="font-medium">{fileName}</span>
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".txt,.pdf,.xlsx,.docx,text/html"
                                />
                            </div>
                        </div>
                    }
                    {item?.id === selectedOption && selectedOption === 3 &&

                        <div className="mt-6">
                            <CustomInput label="Website Url" placeholder="Enter website URL" />
                        </div>
                    }
                </div>
            ))}
        </section>
    )
}
const knowledgeSources = [
    {
        id: 1,
        tabOption: "Input Text"
    },
    {
        id: 2,
        tabOption: "Upload Files"
    },
    {
        id: 3,
        tabOption: "Website"
    },
]