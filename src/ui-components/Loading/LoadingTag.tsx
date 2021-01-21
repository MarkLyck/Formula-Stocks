import React from 'react'
import { Tag, LoadingIndicator } from 'src/ui-components'
import { useAtom, themeAtom } from 'src/atoms'

export const LoadingTag = () => {
    const [theme] = useAtom(themeAtom)

    return (
        <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.basic[300]}>
            loading <LoadingIndicator style={{ marginLeft: '8px' }} />
        </Tag>
    )
}
