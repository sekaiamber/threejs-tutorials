var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.json');

var floders = fs.readdirSync(path.join(__dirname, '..', '/src/lessons'));

var routers = floders.map(name => ({
  name: 'c' + name,
  entry: `./lessons/${name}/index`,
  template: `./lessons/${name}/template.html`,
  filename: `./${name}.html`
}));

var entry = {
  three: './lib/three.min',
};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: ['three', r.name],
  inject: 'body',
  templateParameters: {
    ...r.templateParameters,
  },
}));
var rewrites = routers.map(r => ({
  from: new RegExp('\\/' + r.name),
  to: '/' + r.filename,
}));

var apis = [
  config.STATIC_PROXY,
];

var proxy = {};
apis.forEach((api) => {
  proxy[api] = {
    target: config.STATIC_PROXY_TARGET,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/static': '' },
  };
})

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '..', '/src'),
  entry,
  devServer: {
    inline: true,
    hot: true,
    // host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
      rewrites,
    },
    proxy,
  },
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
        }, // creates style nodes from JS strings
        {
          loader: 'css-loader'
        }, // translates CSS into CommonJS
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        },
      ],
    }, {
      test: /\.glsl$/,
      use: [{
          loader: 'raw-loader'
        },
      ],
    }, {
      test: /\.(png|jpg|gif|svg|mp3|mp4|blob|woff|woff2|webp|eot|ttf|typeface|glb)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }, {
      test: /\.layout\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          interpolate: true,
        },
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, '..', '/src'),
      '@assets': path.join(__dirname, '..', '/src/_assets'),
    }
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
    three: 'THREE',
  },
};
