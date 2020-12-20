import React from 'react'
import { StatisticsDialog, AIScoreDialog } from './index'

export default {
  title: 'Landing page/dialogs',
  parameters: {
    layout: 'centered'
  }
}

export const statistics = () => (
  <StatisticsDialog isVisible onClose={() => { }} />
)

export const ai_score = () => (
  <AIScoreDialog isVisible onClose={() => { }} />
)