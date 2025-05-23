"use client";
import { useParams } from "next/navigation";
import { useWeb3Context } from "@/context/useWeb3Context";
import { useEffect, useState } from "react";

type Poll = {
  name: string;
  startTime: number;
  endTime: number;
  creator: string;
};

type Candidate = {
  name: string;
};

export default function PollDetail() {
  const params = useParams() as { pollId: string };
  const pollId = params?.pollId;
  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;

  const [poll, setPoll] = useState<Poll | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const fetchPollDetails = async () => {
    if (!contractInstance || pollId === undefined) return;

    try {
      const details = await contractInstance.getPollDetails(pollId);
      const [name, startTime, endTime, creator, fetchedCandidates] = details;

      setPoll({
        name,
        startTime: Number(startTime),
        endTime: Number(endTime),
        creator,
      });
      setCandidates(fetchedCandidates as Candidate[]);

      const voted: boolean = await contractInstance.hasUserVoted(
        pollId,
        selectedAccount
      );

      setHasVoted(voted);
    } catch (error) {
      console.error("Failed to load poll:", error);
    }
  };

  const vote = async (candidateIndex: number) => {
    try {
      setIsVoting(true);
      const tx = await contractInstance.vote(pollId, candidateIndex);
      await tx.wait();
      fetchPollDetails(); // refresh data
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const fetchWinner = async () => {
    try {
      const [name]: [string] = await contractInstance.getWinner(pollId);
      setWinner(name);
    } catch (err) {
      console.error("Error fetching winner:", err);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, [contractInstance, pollId]);

  const isPollEnded = poll && Date.now() / 1000 > poll.endTime;

  return (
    <div className="p-6">
      {poll ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{poll.name}</h1>
          <p className="text-gray-500">Created by: {poll.creator}</p>
          <p>
            Start: {new Date(poll.startTime * 1000).toLocaleString()} | End:{" "}
            {new Date(poll.endTime * 1000).toLocaleString()}
          </p>

          <div className="mt-6">
            {candidates.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border p-3 my-2 rounded"
              >
                <span>{c.name}</span>
                <button
                  onClick={() => vote(idx)}
                  className="bg-blue-600 text-white px-4 py-1 rounded border-2 cursor-pointer"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>

          {hasVoted && <p className="text-green-600 mt-4">Voted, Done!</p>}

          {isPollEnded && (
            <p className="text-xl  text-black my-3">🕒 Voting Closed</p>
          )}

          {isPollEnded && (
            <button
              className="bg-green-600 text-white px-4 py-2 mt-6 rounded cursor-pointer"
              onClick={fetchWinner}
            >
              Show Winner
            </button>
          )}

          {winner && (
            <p className="text-xl mt-4 text-black">🏆 Winner: {winner}</p>
          )}
        </>
      ) : (
        <p>Loading poll details...</p>
      )}

      {isVoting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mb-4"
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
            <p className="text-lg font-medium text-blue-700">
              Voting in progress...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
