"use client";
import { useParams } from "next/navigation";
import { useWeb3Context } from "@/context/useWeb3Context";
import { useEffect, useState } from "react";

export default function PollDetail() {
  const { pollId } = useParams();
  const { web3State } = useWeb3Context();
  const { contractInstance, selectedAccount } = web3State;

  const [poll, setPoll] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);


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
      setCandidates(fetchedCandidates);

      const voted = await contractInstance.hasUserVoted(pollId, selectedAccount);

      setHasVoted(voted);
    } catch (error) {
      console.error("Failed to load poll:", error);
    }
  };


  const vote = async (candidateIndex: number) => {
    try {

      const tx = await contractInstance.vote(pollId, candidateIndex);
      await tx.wait();
      fetchPollDetails(); // refresh data
    } catch (error) {
      console.error("Voting failed:", error);
    } 
  };

   const fetchWinner = async () => {
    try {
      const [name] = await contractInstance.getWinner(pollId);
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
              <div key={idx} className="flex items-center justify-between border p-3 my-2 rounded">
                <span>{c.name}</span>
                <button
                  onClick={() => vote(idx)}
                  // disabled={hasVoted || isPollEnded || loadingVote}
                  className="bg-blue-600 text-white px-4 py-1 rounded border-2 cursor-pointer"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>

          {hasVoted && <p className="text-green-600 mt-4">You already voted!</p>}
          {isPollEnded && (
            <button
              className="bg-green-600 text-white px-4 py-2 mt-6 rounded"
              onClick={fetchWinner}
            >
              Show Winner
            </button>
          )}

          {winner && (
            <p className="text-xl mt-4 text-blue-800">🏆 Winner: {winner}</p>
          )}
        </>
      ) : (
        <p>Loading poll details...</p>
      )}
    </div>

  );
}