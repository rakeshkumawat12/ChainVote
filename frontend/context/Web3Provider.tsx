"use client";

import { useEffect, useState } from "react";
import { Web3Context } from "./Web3Context";
import { getWeb3State } from "@/utils/getWeb3State";

type Web3ProviderProps = {
  children: React.ReactNode;
};

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [web3State, setWeb3State] = useState<any>({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    signer: null,
    provider: null,
  });

  const handleWallet = async () => {
    try {
      const { contractInstance, selectedAccount, chainId, signer, provider } =
        await getWeb3State();

      setWeb3State({
        contractInstance,
        selectedAccount,
        chainId,
        signer,
        provider,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Web3Context.Provider value={{ web3State, handleWallet }}>
        {children}
      </Web3Context.Provider>
    </>
  );
};

export default Web3Provider;
