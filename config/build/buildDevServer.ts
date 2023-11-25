import path from "path";
import { BuildOptions } from "./types/types";

export const buildDevServer = (options: BuildOptions) => {
  return {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: options.port,
    historyApiFallback: true,
    allowedHosts: "all",
    compress: true,
    open: true,
    hot: true,
    host: "0.0.0.0",

    client: {
      overlay: {
        warnings: false,
      },
    },
  };
};

