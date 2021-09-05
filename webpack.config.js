module.exports = {
    entry: './src/index.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            // `.swcrc` can be used to configure swc
            loader: "swc-loader"
          },
          exclude: /(node_modules|bower_components)/,
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    }
  };
  