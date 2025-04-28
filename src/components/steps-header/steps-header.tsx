'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
const steps = [
    { label: 'Profile', path: '/profile' },
    { label: 'Tone', path: '/appearance' },
    { label: 'Agent Details', path: '/agent-details' },
    { label: 'Knowledge Sources', path: '/knowledge' },
    { label: 'Chat', path: '/chat' },
    { label: 'Agent Export', path: '/agent-export' },
]

export default function StepsHeader() {
    const router = useRouter()
    const pathname = usePathname()
    const activeStep = steps.findIndex((step) => step.path === pathname)



    const goToStep = (index: number) => {
        router.push(steps[index].path)
    }

    const goBack = () => {
        if (activeStep > 0) goToStep(activeStep - 1)
    }

    const goNext = () => {
        if (activeStep < steps.length - 1) goToStep(activeStep + 1)
    }

    return (
        <div className="flex items-center justify-between space-x-2 py-6 px-4 max-w-[1450px] mx-auto">
            <div className='flex items-center gap-4'>
                <button
                    onClick={goBack}
                    className="flex items-center w-[40px] h-[40px] px-3 bg-[#EDF3FF] rounded-md"
                >
                    <Image src="/svg/arrow-back.svg" alt="Back" width={16} height={16} priority />
                </button>
                Back
            </div>
            <div className='max-w-[900px]'>
                <div className='flex items-center gap-6'>

                    {steps.map((step, index) => (
                        <button
                            key={step.path}
                            onClick={() => goToStep(index)}
                            className={`px-5 py-2 rounded-md text-sm border transition w-[180px] whitespace-nowrap ${index === activeStep
                                ? 'bg-[#324168] text-white border-[#2B396C]'
                                : 'bg-white text-black border-[#e5e5e5]'
                                }`}
                        >
                            {step.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-4'>
                Next
                <button
                    onClick={goNext}
                    className="flex items-center w-[40px] h-[40px] px-3 bg-[#EDF3FF] rounded-md"
                >
                    <Image src="/svg/arrow-next.svg" alt="Next" width={16} height={16} priority />
                </button>

            </div>
        </div>
    )
}
