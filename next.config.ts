import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js / R3F packages that use ES modules
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
