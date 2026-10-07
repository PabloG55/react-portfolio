import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apps = ["trainpilot", "skipper"];
    return {
      beforeFiles: apps.flatMap(app => {
        const pages: Record<string, string> = {
          "/": `/${app}`,
          "/privacy": `/docs/policy/${app}`,
          "/support": `/docs/support/${app}`,
        };
        if (app === "trainpilot") pages["/delete-account"] = "/docs/delete-account/trainpilot";
        return Object.entries(pages).map(([source, destination]) => ({
          source,
          destination,
          has: [{ type: "host" as const, value: `${app}\\.pablogarces\\.dev` }],
        }));
      }),
    };
  },
};

export default nextConfig;
