import CustomInput from "../custom-input/custom-input";
import Dropdown from "../dropdown/dropdown";

export default function AgentInformation() {
    return (
        <section className="w-full">
            <h2 className="font-semibold text-xl">Agent Details</h2>
            <div className="w-full mt-6 space-y-6">
                <CustomInput label="Agent Name" placeholder="Agent Name" />
                <CustomInput label="What&apos;s your agent role (Optional)" placeholder="e.g Customer success manager" />
                <div>
                    <label htmlFor="instuction" className="text-sm font-medium mb-2">Add Instruction (Optional)</label>
                    <textarea name="instuction" id="instuction" rows={4} placeholder="What does your agent do? How should it behave? What should it not do?" className="w-full px-4 border border-[#e5e5e5] rounded-[10px] focus:outline-none p-2 mt-2">
                    </textarea>
                </div>
                <Dropdown options={personality} />
            </div>
        </section>
    )
}
const personality = [
    {
        id:1,
        option:"Friendly And Professional",
    },
    {
        id:2,
        option:"Friendly And Professional",
    },
    {
        id:3,
        option:"Friendly And Professional",
    },
    {
        id:4,
        option:"Friendly And Professional",
    },
]