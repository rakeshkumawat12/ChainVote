"use client";

import { useWeb3Context } from "@/context/useWeb3Context";
import { useState } from "react";

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);

  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;

  const handleCreatePoll = async () => {
    try {
      const filteredOptions = options.filter((opt) => opt.trim() !== "");

      setLoading(true);
      const tx = await contractInstance.createPoll(
        title,
        filteredOptions,
        duration
      );
      await tx.wait();
      alert("Poll created successfully!");
      setTitle("");
      setOptions(["", ""]);
      setDuration(1);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 dark:border-zinc-700">
      <h2 className="text-2xl font-semibold text-zinc-800 ">Create Poll</h2>
      <input
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 dark:border-zinc-600 bg-white  text-zinc-900  p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-2">
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => updateOption(idx, e.target.value)}
            className="border border-gray-300  bg-white  text-zinc-900  p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        onClick={() => setOptions([...options, ""])}
        className="text-blue-600 hover:underline font-medium cursor-pointer"
      >
        + Add Option
      </button>

      <input
        type="number"
        placeholder="Duration in minutes"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        className="border border-gray-300  bg-white  text-zinc-900  p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleCreatePoll}
        className="text-white px-4 py-2 rounded mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition cursor-pointer w-full flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Deploying...
          </>
        ) : (
          "Deploy Poll"
        )}
      </button>
    </div>
  );
}
