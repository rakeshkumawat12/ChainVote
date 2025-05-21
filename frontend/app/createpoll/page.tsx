"use client";

import { useWeb3Context } from "@/context/useWeb3Context";
import { useState } from "react";

export default function CreatePoll() {
  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(1);

  

  const handleCreatePoll = async () => {
    try {
      const filteredOptions = options.filter((opt) => opt.trim() !== "");

      
      const tx = await contractInstance.createPoll(title, filteredOptions, duration);
      await tx.wait();
      alert("Poll created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Create Poll</h2>
      <input
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />

      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => updateOption(idx, e.target.value)}
          className="border p-2 w-full mt-2"
        />
      ))}

       <button
        onClick={() => setOptions([...options, ""])}
        className="text-blue-500"
      >
        + Add Option
      </button>

      <input
        type="number"
        placeholder="Duration in minutes"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        className="border p-2 w-full mt-2"
      />

       <button
        onClick={handleCreatePoll}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Deploy Poll
      </button>
    </div>
  );
}
