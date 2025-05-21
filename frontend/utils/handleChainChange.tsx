export const handleChainChange = async (setWeb3State: any) => {
  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });
  const chainId = parseInt(chainIdHex, 16);
  setWeb3State((prevState: any) => ({ ...prevState, chainId }));
};
