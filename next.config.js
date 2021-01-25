const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const AntdThemePlugin = require('antd-theme/plugin')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess(
  withSass({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
    webpack: (config) => {
      config.plugins.push(
        new AntdThemePlugin({
          themes: [
            {
              name: 'dark',
              filename: require.resolve('antd/lib/style/themes/dark.less'),
            },
            {
              name: 'compact',
              filename: require.resolve('antd/lib/style/themes/compact.less'),
            },
          ],
        })
      )

      config.module.rules[2].use = [
        {
          loader: AntdThemePlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ]

      console.log('config', config)
      console.log('config.module', config.module)
      console.log('config.module.rules[2]', config.module.rules)
      console.log('config.module.rules[2]', config.module.rules[2])

      return config
    },
  })
)
