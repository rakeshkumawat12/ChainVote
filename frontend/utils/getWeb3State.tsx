import { ethers } from "ethers";
import abi from "@/constant/abi.json";
import axios from "axios";
// import {toast} from "react-hot-toast"

export const getWeb3State = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
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

    const contractAddress = "0x7F8a55B58b2cC0DAB50B3c6396165c4E30F0dE1b"; 

    const message =
      "Welcome to ChainVote Dapp. You accept our terms and condition.";
    const signature = await signer.signMessage(message);
    const dataSignature = {
      signature,
    };

    // const res = await axios.post(
    //   `http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,
    //   dataSignature
    // );
    // localStorage.setItem("token", res.data.token);

    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    
    return { contractInstance, selectedAccount, chainId ,signer,provider};
   
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
