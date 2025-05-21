export const handleAccountChange = async (setWeb3State: any) => {
  const accounts = window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const selectedAccount = accounts[0];
  setWeb3State((prevState: any) => ({ ...prevState, selectedAccount }));
};
