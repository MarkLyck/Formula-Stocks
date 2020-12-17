export interface LineAnnotationType {
  start: [string, number]
  end: [string, number]
  style: {
    stroke: string
    lineWidth: number
    lineDash: [number, number]
  }
  text: {
    position: string
    style: {
      fill: string
      fontSize: number
      fontWeight: string
    }
    content: string
    offsetY: number
    offsetX: number
  }
}

export interface RegionFilterType {
  top: boolean
  start: [string, number]
  end: [string, number]
  color: string
}
