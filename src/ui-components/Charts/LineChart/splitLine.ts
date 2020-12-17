import { isBefore, subDays } from 'date-fns'

export interface splitLineType {
  G2: any
  splitDate: Date
  splitEndDate?: Date
  color: string
  splitColor: string
  id: string
}

function splitData(points: any[], data: any, splitDate: Date, splitEndDate?: Date) {
  const data1 = []
  const data2 = []
  const data3 = []

  points.forEach((point: any, i: number) => {
    const date = data[i].date
    if (isBefore(date, subDays(splitDate, 1))) {
      data1.push(point)
    } else {
      if (splitEndDate) {
        if (isBefore(date, splitEndDate)) {
          data2.push(point)
        } else {
          data3.push(point)
        }
      } else {
        data2.push(point)
      }
    }
  })

  if (splitEndDate) {
    data2.push(data3[0])
    return [data1, data2, data3]
  }
  data1.push(data2[0])

  return [data1, data2]
}

const createSplitLine = ({ G2, id, splitDate, color, splitColor, splitEndDate }: splitLineType) => {
  G2.registerShape('line', id, {
    draw(cfg, container) {
      const pointArrs = splitData(cfg.points, cfg.data, splitDate, splitEndDate)

      const path1 = []
      for (let i = 0; i < pointArrs[0].length; i++) {
        let pre = 'L'
        if (i === 0) {
          pre = 'M'
        }
        if (pointArrs[0][i]) {
          path1.push([pre, pointArrs[0][i].x, pointArrs[0][i].y])
        }
      }

      container.addShape('path', {
        attrs: {
          path: path1,
          stroke: color,
          lineWidth: 2,
        },
      })

      const path2 = []
      for (let i = 0; i < pointArrs[1].length; i++) {
        let pre = 'L'
        if (i === 0) {
          pre = 'M'
        }
        if (pointArrs[1][i]) {
          path2.push([pre, pointArrs[1][i].x, pointArrs[1][i].y])
        }
      }

      container.addShape('path', {
        attrs: {
          path: path2,
          stroke: splitColor,
          lineWidth: 2,
          opacity: 1,
        },
      })

      if (splitEndDate) {
        const path3 = []
        for (let i = 0; i < pointArrs[2].length; i++) {
          let pre = 'L'
          if (i === 0) {
            pre = 'M'
          }
          if (pointArrs[2][i]) {
            path3.push([pre, pointArrs[2][i].x, pointArrs[2][i].y])
          }
        }

        const line = container.addShape('path', {
          attrs: {
            path: path3,
            stroke: color,
            lineWidth: 2,
            opacity: 1,
          },
        })
        return line
      }

      return container
    },
  })
}

export default createSplitLine
