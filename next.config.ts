import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not auto-generate AGENTS.md / CLAUDE.md; project docs are maintained by hand.
  agentRules: false,

  // Root language routing (docs/03 §3). V0 always falls back to English;
  // preference-based routing is an implementation decision for later.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
