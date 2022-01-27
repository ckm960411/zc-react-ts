const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 배포할 떄는 'production'
  devtool: "eval", // 배포할 때는 'hidden-source-map'
  resolve: {
    // webpack 에서 처리해주는 확장자들
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },

  entry: {
    app: "./client", // webpack 에서 설정하는 메인 파일
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  plugins: [],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"), // 'dist' 폴더 안에 app.js 로 메인파일이 생성됨
  },
};
