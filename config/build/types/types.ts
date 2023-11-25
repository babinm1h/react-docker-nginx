export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  icon: string;
  public: string;
}

export type BuildMode = "development" | "production";

