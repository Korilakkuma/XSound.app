import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'node:path';

const dirname = path.resolve('.');

const terserPlugin = new TerserPlugin({
  terserOptions: {
    compress: {
      drop_console: true
    },
    keep_classnames: /^.*?Processor$/
  }
});

export default [
  {
    mode: 'development',
    entry: {
      app: ['./src/main.tsx', './src/main.css']
    },
    output: {
      globalObject: 'this',
      filename: '[name].js',
      path: `${dirname}/assets`,
      publicPath: '/assets/',
      assetModuleFilename: 'images/[name][ext]'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCSSExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.png$/,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'app.css'
      })
    ],
    optimization: {
      // eslint-disable-next-line no-undef
      minimize: process.env.NODE_ENV === 'production',
      minimizer: [terserPlugin, new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      },
      usedExports: true
    },
    devtool: 'source-map',
    devServer: {
      static: dirname,
      host: '0.0.0.0'
    }
  },
  {
    mode: 'development',
    entry: {
      register: ['./src/register-service-worker.ts'],
      sw: ['./src/service-worker.ts']
    },
    output: {
      globalObject: 'this',
      filename: '[name].js',
      path: dirname,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
    optimization: {
      // eslint-disable-next-line no-undef
      minimize: process.env.NODE_ENV === 'production',
      minimizer: [terserPlugin],
      usedExports: true
    }
  }
];
