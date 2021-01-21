import { useState, useEffect } from 'react'
import { isBrowser } from 'src/common/utils/featureTests'

// Hook
function useWindowSize() {
    function getSize() {
        return {
            width: isBrowser ? window.innerWidth : 0,
            height: isBrowser ? window.innerHeight : 0,
        }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    // @ts-ignore
    useEffect(() => {
        if (!isBrowser) return false

        function handleResize() {
            setWindowSize(getSize())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount and un-mount

    return windowSize
}

export default useWindowSize
