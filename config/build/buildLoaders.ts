import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { removeDataTestIdPlugin } from "./babel/removeDataTestIdPlugin";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const isDev = options.mode === "development";

  const plugins = [];

  if (!isDev) {
    plugins.push([
      removeDataTestIdPlugin,
      {
        props: ["data-testid"],
      },
    ]);
  }

  return [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    },

    // {
    //   test: /\.tsx?$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: "babel-loader",
    //     options: {
    //       plugins: plugins.length ? plugins : undefined,
    //     },
    //   },
    // },

    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        {
          loader: "css-loader",
        },
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgoConfig: {
              plugins: [
                {
                  name: "convertColors",
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        },
      ],
    },
  ];
};

