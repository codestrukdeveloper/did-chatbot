const tones = ["Professional", "Friendly", "Strict", "Rudely"];

export default function ToneSelector() {
  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-semibold mb-6">Tone of Language</h2>
      <div className="space-y-4 w-full">
        {tones.map((tone, idx) => (
          <label key={idx} className="flex items-center gap-3 cursor-pointer w-full justify-between border border-[#e5e5e5] rounded-[10px] p-4">
              <span>{tone}</span>
            <input
              type="radio"
              name="tone"
              defaultChecked={tone === "Professional"}
              className="w-4 h-4 text-blue-600"
              style={{ accentColor: "#324168" }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
