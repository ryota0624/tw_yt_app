/**
 * Created by ryota on 15/09/06.
 */
module.exports = {
  entry: {
    app: "./render/post/index.jsx"
  },
  output: {
    filename: "./build/post.js"
  },
  // source-mapを出力
  devtool: "#source-map",
  module: {
    // ローダ設定
    loaders: [
      {test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015","react"],
        }
      },
      {test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015","react"],
        }
      }
    ]
  },
  resolve: {
    // requireやimport時の拡張子を省略
    extensions: ['', '.js', '.jsx']
  },
};
