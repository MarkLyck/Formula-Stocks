import mixpanel from 'mixpanel-browser'
mixpanel.init('21d2563f792284bac6714d9500060532')

let env_check = process.env.NODE_ENV === 'production'

let actions = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id)
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id)
  },
  track: (name: string, props?: any) => {
    if (env_check) mixpanel.track(name, props)
  },
  register: (props?: any) => {
    if (env_check) mixpanel.register(props)
  },
  people: {
    set: (props: any) => {
      if (env_check) mixpanel.people.set(props)
    },
  },
}

export let Mixpanel = actions
