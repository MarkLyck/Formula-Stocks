import React, { useState, useEffect } from 'react'

let loadingChartLibrary = false
let G2 = null

const withCharts = (ComponentWithChart) => (props) => {
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
