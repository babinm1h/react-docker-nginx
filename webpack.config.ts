import path from "path";
import { Configuration } from "webpack";
import { buildWebpack } from "./config/build/build.webpack";

interface IEnvCfg {
  mode: "development" | "production";
  port?: number;
}

const webpackConfig = (env: IEnvCfg): Configuration => {
  const isDev = env.mode === "development";

  const config = buildWebpack({
    mode: env.mode || "development",
    port: env.port || 7000,
    paths: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
      icon: path.resolve(__dirname, "public", "favicon.png"),
      public: path.resolve(__dirname, "public"),
    },
  });

  return config;
};

export default webpackConfig;

