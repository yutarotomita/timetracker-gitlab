const glob = require("glob");

module.exports = {
  
    module: {
        rules: [
          {
            // 拡張子 .ts の場合
            test: /\.tsx?$/,
            // TypeScript をコンパイルする
            use: 'ts-loader',
          },
        ],
      },
    
      // import 文で .ts ファイルを解決する。これを定義することで import 文で拡張子を書く必要がなくなる
    resolve: {
        // 拡張子を配列で指定
        extensions: [
            '.ts', '.js',
        ],
    },

    entry: glob.sync('./src/@(apps|function)/**/*.@(ts|js)').reduce((entries, entry, i) => {
        entries[entry.replace('./src/', '')] = entry;
        return entries; 
      }, {}),
    
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/dist`
    },
    
    //ソースマップ有効 公開時はproduction
    mode: "development",

    // evalは chrome extention で怒られるのでビルド方式を変更
    devtool: 'cheap-module-source-map',
  };