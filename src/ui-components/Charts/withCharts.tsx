import React, { useState, useEffect } from 'react'

// let loadingChartLibrary: boolean = false
let G2: any = null

const withCharts = (ComponentWithChart: any) => (props: any) => {
  const [chartLibraryLoaded, setChartLibraryLoaded] = useState(G2 !== null)

  const loadChartLibrary = async () => {
    G2 = await import('@antv/g2')
    setChartLibraryLoaded(true)
  }

  useEffect(() => {
    if (G2 === null) {
      loadChartLibrary()
    }
  })

  return <ComponentWithChart {...props} chartLibraryLoaded={chartLibraryLoaded} G2={G2} />
}

export default withCharts
