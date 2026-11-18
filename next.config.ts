import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apps = ["trainpilot", "skipper"];
    return {
      beforeFiles: [...apps.flatMap(app => {
        const pages: Record<string, string> = {
          "/": `/${app}`,
          "/privacy": `/docs/policy/${app}`,
          "/support": `/docs/support/${app}`,
          "/terms": `/docs/terms/${app}`,
        };
        if (app === "trainpilot") pages["/delete-account"] = "/docs/delete-account/trainpilot";
        return Object.entries(pages).map(([source, destination]) => ({
          source,
          destination,
          has: [{ type: "host" as const, value: `${app}\\.pablogarces\\.dev` }],
        }));
      }),
      // Shared TrainPilot routines: the page is a Cloudflare worker in the trainpilot repo
      // (workers/routine-share), so the link can live on this domain.
      {
        source: "/r/:code",
        destination: "https://trainpilot-routine.pasebarona.workers.dev/r/:code",
        has: [{ type: "host" as const, value: "trainpilot\\.pablogarces\\.dev" }],
      },
      { source: "/", destination: "/ghostfleet", has: [{ type: "host" as const, value: "ghostfleet\\.pablogarces\\.dev" }] }],
    };
  },
};

export default nextConfig;
