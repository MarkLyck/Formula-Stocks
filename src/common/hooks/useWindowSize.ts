import { useState, useEffect } from 'react'
import { isBrowser } from '~/common/utils/featureTests'

// Hook
function useWindowSize() {
    const isBrowser = typeof window === 'object'

    function getSize() {
        return {
            width: isBrowser ? window.innerWidth : undefined,
            height: isBrowser ? window.innerHeight : undefined,
        }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    // @ts-ignore
    useEffect(() => {
        if (!isBrowser) {
            return false
        }

        function handleResize() {
            setWindowSize(getSize())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount and un-mount

    return windowSize
}

export default useWindowSize
