""

import { createContext } from "react";

// export type Web3ContextType = {
//   web3State: {
//     selectedAccount: string | null;
//     // Add other properties if needed
//   };
//   handleWallet: () => void;
// };

export const Web3Context = createContext<any>(undefined);