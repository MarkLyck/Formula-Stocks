const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = async ({ config, mode }) => {
  // temp fix for: https://github.com/storybookjs/storybook/issues/12114
  config.resolve.alias['@emotion/styled'] = toPath('node_modules/@emotion/styled')
  // config.resolve.alias["~"] = toPath("src/")

  // This is required to change theme variables in ant-design
  // https://ant.design/docs/react/customize-theme
  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            modifyVars: { '@primary-color': '#0066E8' },
            javascriptEnabled: true,
          },
        },
      },
    ],
    include: [path.resolve(__dirname, '../src'), /[\\/]node_modules[\\/].*antd/],
  })

  // typescript paths
  if (config.resolve.plugins) {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
  } else {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
  }

  return config
}
