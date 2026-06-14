"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  base,
  arbitrum,
  polygon,
  optimism,
  gnosis,
  avalanche,
  bsc,
  sepolia,
} from "wagmi/chains";

// WalletConnect Cloud project ID required for "Connect wallet". Get one at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  console.warn(
    "[Convixa] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will fail (403 / WebSocket 3000). Add it to .env from https://cloud.walletconnect.com"
  );
}

export const config = getDefaultConfig({
  appName: "Convixa",
  projectId: projectId ?? "placeholder-invalid", // RainbowKit requires a string; use real ID to avoid 403/3000
  chains: [
    mainnet,
    base,
    arbitrum,
    polygon,
    optimism,
    gnosis,
    avalanche,
    bsc,
    sepolia,
  ],
  ssr: true,
});
