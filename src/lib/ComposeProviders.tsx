import React, { FC, ComponentType, Fragment } from 'react'

type Components = any | ComponentType | [ComponentType, { [key: string]: any }]

interface Props {
  components: Components[]
}

const ComposeProviders: FC<Props> = ({ components, children }) => (
  <Fragment>
    {components.reverse().reduce((acc, curr) => {
      const [Provider, props] = Array.isArray(curr)
        ? [curr[0], curr[1]]
        : [curr, {}]
      return <Provider {...props}>{acc}</Provider>
    }, children)}
  </Fragment>
)

export default ComposeProviders
