"use client";

import { useWeb3Context } from "@/context/useWeb3Context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const [polls, setPolls] = useState<
    { name: string; startTime: number; endTime: number; creator: string }[]
  >([]);

  const fetchPolls = async () => {
    try {
      const [names, startTimes, endTimes, creators] =
        await contractInstance.getAllPollsMetadata();

      const formatted = names.map((name: string, index: number) => ({
        name,
        startTime: Number(startTimes[index]),
        endTime: Number(endTimes[index]),
        creator: creators[index],
      }));

      setPolls(formatted);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [contractInstance]);

  const router = useRouter();

  const handleViewDetails = (pollId: number) => {
    router.push(`/polldetail/${pollId}`);
  };

  return (
    <div className="text-2xl font-bold underline">
      <input type="text" placeholder="Search" className="border" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded border-2 cursor-pointer" onClick={() => router.push("/createpoll")}>
        Create Poll
      </button>

      <h2 className="text-xl font-semibold">All Polls</h2>
      <div className="space-y-3">
        {polls.length === 0 ? (
          <p>No polls found</p>
        ) : (
          polls.map((poll, index) => (
            <div
              key={index}
              className="border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-medium">{poll.name}</p>
              <p>Creator: {poll.creator}</p>
              <p>
                Start: {new Date(poll.startTime * 1000).toLocaleString()} | End:{" "}
                {new Date(poll.endTime * 1000).toLocaleString()}
              </p>
              <button
                onClick={() => handleViewDetails(index)}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                View and Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
