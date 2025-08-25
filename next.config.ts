import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //add config patterns here 

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all hostnames
        pathname: "**", // required for wildcard paths
      },
    ],
  },
  experimental:{
      ppr :'incremental',

  },
  devIndicators:{
    appIsrStatus:true,
    buildActivity:true,
    buildActivityPosition:'bottom-right',
  }
};

export default nextConfig;
