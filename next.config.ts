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
  
  devIndicators:{
    appIsrStatus:true,
    buildActivity:true,
    buildActivityPosition:'bottom-right',
  }
};

export default nextConfig;
