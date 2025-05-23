"use client";

import { useWeb3Context } from "@/context/useWeb3Context";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Poll = {
  name: string;
  startTime: number;
  endTime: number;
  creator: string;
};

export default function Home() {
  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;

  const [searchPoll, setSearchPoll] = useState<string>("");

  const [polls, setPolls] = useState<Poll[]>([]);

  const filteredPolls = polls.filter((poll) =>
    poll.name.toLowerCase().includes(searchPoll.toLowerCase())
  );

  const fetchPolls = useCallback(async () => {
    try {
      const [names, startTimes, endTimes, creators] =
        await contractInstance.getAllPollsMetadata();

      const formatted: Poll[] = names.map((name: string, index: number) => ({
        name,
        startTime: Number(startTimes[index]),
        endTime: Number(endTimes[index]),
        creator: creators[index],
      }));

      setPolls(formatted);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  }, [contractInstance]);

  useEffect(() => {
  if (contractInstance) {
    fetchPolls();
  }
}, [contractInstance, fetchPolls]);

  const router = useRouter();

  const handleViewDetails = (pollId: number) => {
    router.push(`/polldetail/${pollId}`);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };

  if (!selectedAccount) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Please connect your wallet to see polls.
      </div>
    );
  }

  return (
    <div className="text-2xl font-bold">
      <form className="max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-gray-500 focus:border-gray-500"
            placeholder="Search polls..."
            value={searchPoll}
            onChange={(e) => setSearchPoll(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center justify-between my-4 mx-7 border-b-1 border-gray-200 pb-4">
        <h2 className="text-xl font-semibold">All Polls</h2>
        <button
          className="block rounded-md cursor-pointer bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          onClick={() => router.push("/createpoll")}
        >
          Create Poll
        </button>
      </div>

      <div className="space-y-3">
        {filteredPolls.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No polls found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-7">
            {filteredPolls.map((poll, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                <p className="text-lg font-semibold mb-2">{poll.name}</p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Creator:</strong>
                  {shortenAddress(poll.creator)}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Start:</strong>{" "}
                  {new Date(poll.startTime * 1000).toLocaleString()}
                  <br />
                  <strong>End:</strong>{" "}
                  {new Date(poll.endTime * 1000).toLocaleString()}
                </p>
                <button
                  onClick={() => handleViewDetails(index)}
                  className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer transition"
                >
                  View and Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
