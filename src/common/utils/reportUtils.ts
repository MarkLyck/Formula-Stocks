import theme from '~/lib/theme'

export const getAIScoreColor = (value: number) => {
    if (value < -20) {
        return theme.palette.scale.worst
    }
    if (value < 20) {
        return theme.palette.scale.bad
    }
    if (value < 50) {
        return theme.palette.scale.average
    }
    if (value < 75) {
        return theme.palette.scale.good
    }
    return theme.palette.scale.perfect
}

export const getAIScoreType = (value: number) => {
    if (value < -50) {
        return 'very bad'
    }
    if (value < -20) {
        return 'bad'
    }
    if (value < 20) {
        return 'average'
    }
    if (value < 50) {
        return 'good'
    }
    if (value < 75) {
        return 'very good'
    }
    return 'excellent'
}
