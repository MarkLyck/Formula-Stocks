import { useEffect } from 'react'
import flagsmith from 'flagsmith';

const FlagSmithProvider = ({ children }) => {
    useEffect(() => {
        flagsmith.init({
            environmentID: "8VKHezCZtcCNPfcTmtjddh",
            onChange: (oldFlags: any, params: any) => {

                if (flagsmith.hasFeature("monthly_portfolio_chart")) {
                    console.log("monthly_portfolio_chart")
                }
            }
        })
    }, [])

    return children
}

export default FlagSmithProvider