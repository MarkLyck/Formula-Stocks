import { format } from 'date-fns'

const DURATION = 4800

export interface BreathPointType {
  date: string
  color: string
  id: string
}

const createBreathPointShape = (G2: any, { id, date, color }: BreathPointType) => {
  G2.registerShape('point', id, {
    draw(cfg: any, container: any) {
      const data = cfg.data
      const point = { x: cfg.x, y: cfg.y }
      const group = container.addGroup()

      if (format(data.date, 'yyyy-MM-dd') === date) {
        const decorator1 = group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: 5,
            fill: color,
            opacity: 0.5,
          },
        })
        decorator1.animate(
          {
            r: 15,
            opacity: 0,
          },
          {
            duration: DURATION,
            easing: 'easeLinear',
            repeat: true,
          }
        )
        group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: 5,
            fill: color,
            opacity: 0.8,
          },
        })
        group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: 1.5,
            fill: color,
          },
        })
      }

      return group
    },
  })
}

export default createBreathPointShape
