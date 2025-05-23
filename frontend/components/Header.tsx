"use client";

import { useEffect } from "react";
import { useWeb3Context } from "@/context/useWeb3Context";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Header() {
  const { handleWallet, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      console.log("Selected account changed:", selectedAccount);
    }
  }, [selectedAccount]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };

  const router = useRouter();

  return (
    <header className="justify-between mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        ChainVote
      </div>

      <div className="flex items-center justify-end ">
        <div className="sm:flex ">
          {!selectedAccount ? (
            <button
              className="block rounded-md cursor-pointer bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
              onClick={handleWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <span className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-800">
              {shortenAddress(selectedAccount)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
