import { ethers } from "ethers";
import abi from "@/constant/abi.json";

const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getWeb3State:any = async () => {
  try {
    if (isMobileDevice()) {
      alert("Please open this DApp on a desktop browser with MetaMask installed.");
      return;
    }
    
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const selectedAccount = accounts[0]

    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });
    const chainId = parseInt(chainIdHex, 16);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = "0xF43D17eD3869219401520CEBC5EbEBE40d45f763"; // Replace with your contract address

    const message =
      "Welcome to ChainVote Dapp. You accept our terms and condition.";
    const signature = await signer.signMessage(message);
  

    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    
    return { contractInstance, selectedAccount, chainId ,signer,provider};
   
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
