import { useEffect } from 'react'
import flagsmith from 'flagsmith/isomorphic';

const FlagProvider = ({ children }: any) => {
    useEffect(() => {
        console.log('useEffect')
        flagsmith.init({
            environmentID: "8VKHezCZtcCNPfcTmtjddh",
            cacheFlags: true,
            onChange: () => { }
        });
    }, [])

    return children
}

export default FlagProvider
