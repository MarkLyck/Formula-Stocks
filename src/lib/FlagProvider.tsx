import React, { useEffect } from 'react'
import flagsmith from 'flagsmith';

import { useAtom, flagAtom } from 'src/atoms'

const FlagProvider = ({ children }: any) => {
    const [flags] = useAtom(flagAtom)
    console.log("flags", flags)

    useEffect(() => {
        flagsmith.init({
            environmentID: "8VKHezCZtcCNPfcTmtjddh",
            cacheFlags: true,
            onChange: (oldFlags: any, params: any) => {
                console.log("params", params)
                console.log("soldFlags", oldFlags)
                console.log("flags onChange", flagsmith.getFlags())
            }
        });
    }, [])

    return children
}

export default FlagProvider
