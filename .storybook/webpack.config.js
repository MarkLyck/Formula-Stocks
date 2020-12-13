const path = require('path')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = async ({ config, mode }) => {

    // temp fix for: https://github.com/storybookjs/storybook/issues/12114
    config.resolve.alias["@emotion/styled"] = toPath("node_modules/@emotion/styled")

    return config
}
