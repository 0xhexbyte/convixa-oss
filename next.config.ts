import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.reown.com",
      "connect-src 'self' https://api.safe.global https://*.walletconnect.org https://api.web3modal.org https://*.web3modal.org https://pulse.walletconnect.org https://eth.merkle.io wss:",
      "frame-src 'self' https://verify.walletconnect.com https://verify.walletconnect.org https://secure.walletconnect.com https://secure.walletconnect.org",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  output: "standalone",
  // Keep postgres driver on server only (avoid bundling resolution issues)
  serverExternalPackages: ["postgres"],
  // workerThreads removed — incompatible with custom webpack functions in Next.js 15.5.
  // Webpack functions (resolve.fallback) cannot be serialized across worker threads,
  // causing DataCloneError. The Next.js persistent cache (convixa-nextjs-build-cache)
  // provides faster incremental builds without worker threads.
  webpack: (config) => {
    // Stub optional peer deps from wagmi/rainbowkit (MetaMask SDK, pino) to avoid build warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
