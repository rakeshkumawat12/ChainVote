"use client";

import { useEffect, useState } from "react";
import { useWeb3Context } from "@/context/useWeb3Context";

declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function Header() {
  const { handleWallet, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

//   const web3Context = useWeb3Context();
//   const selectedAccount = web3Context?.web3State?.selectedAccount;

  useEffect(() => {
    if (selectedAccount) {
      console.log("Selected account changed:", selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <div className="flex justify-between">
      <div className="text-2xl font-bold">ChainVote</div>
      <button onClick={handleWallet}>Connect Wallet</button>
      <div>
        <span> {selectedAccount}</span>
      </div>
    </div>
  );
}
