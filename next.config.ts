import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const pages = {
      "/": "/trainpilot",
      "/privacy": "/docs/policy/trainpilot",
      "/support": "/docs/support/trainpilot",
      "/delete-account": "/docs/delete-account/trainpilot",
    };
    return {
      beforeFiles: Object.entries(pages).map(([source, destination]) => ({
        source,
        destination,
        has: [{ type: "host" as const, value: "trainpilot\\.pablogarces\\.dev" }],
      })),
    };
  },
};

export default nextConfig;
