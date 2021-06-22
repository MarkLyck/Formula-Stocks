import theme from 'src/lib/theme'

export const getAIScoreColor = (value: number) => {
  if (value < -20) {
    return theme.palette.scale.worst
  }
  if (value < 20) {
    return theme.palette.scale.bad
  }
  if (value < 50) {
    return theme.palette.scale.okay
  }
  if (value < 75) {
    return theme.palette.scale.good
  }
  return theme.palette.scale.perfect
}

export const getAIScoreSentiment = (value: number) => {
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

export const getIndustryIcon = (industryName: string) => {
  const industry = industryName.toLowerCase()
  if (industry.includes('advertising')) return 'badge-dollar'
  if (industry.includes('aerospace')) return 'fighter-jet'
  if (industry.includes('agricultural')) return 'wheat'
  if (industry.includes('airlines')) return 'plane'
  if (industry.includes('alternative power')) return 'wind-turbine'
  if (industry.includes('couriers')) return 'shipping-fast'
  if (industry.includes('laboratory')) return 'microscope'
  if (industry.includes('footwear')) return 'boot'
  if (industry.includes('auto parts')) return 'car'
  if (industry.includes('automotive')) return 'car'
  if (industry.includes('alcoholic')) return 'wine-glass'
  if (industry.includes('bio')) return 'biohazard'
  if (industry.includes('broadcast')) return 'broadcast-tower'
  if (industry.includes('building')) return 'house'
  if (industry.includes('hotel')) return 'hotel'
  if (industry.includes('casino')) return 'dice'
  if (industry.includes('child')) return 'baby'
  if (industry.includes('coal')) return 'industry-alt'
  if (industry.includes('print')) return 'print'
  if (industry.includes('peripherals')) return 'mouse'

  if (industry.includes('computer storage')) return 'hdd'
  if (industry.includes('truck')) return 'truck'
  if (industry.includes('construction')) return 'construction'
  if (industry.includes('lending')) return 'money-check-edit-alt'
  if (industry.includes('packaging')) return 'box-alt'
  if (industry.includes('drilling')) return 'gas-pump'
  if (industry.includes('credit card')) return 'credit-card'
  if (industry.includes('crude petroleum')) return 'gas-pump'
  if (industry.includes('hosting')) return 'server'
  if (industry.includes('deep sea')) return 'ship'
  if (industry.includes('dental')) return 'toothbrush'
  if (industry.includes('department stores')) return 'store'
  if (industry.includes('drugs')) return 'capsules'
  if (industry.includes('electrical')) return 'plug'
  if (industry.includes('appliance')) return 'oven'
  if (industry.includes('electronic')) return 'plug'
  if (industry.includes('electric')) return 'bolt'
  if (industry.includes('school')) return 'school'
  if (industry.includes('environment')) return 'recycle'
  if (industry.includes('rental')) return 'sign'
  if (industry.includes('meat')) return 'meat'
  if (industry.includes('candy')) return 'candy-cane'
  if (industry.includes('forest')) return 'tree'
  if (industry.includes('gas')) return 'gas-pump'

  if (industry.includes('hospital')) return 'hospital'
  if (industry.includes('warehousing')) return 'warehouse'
  if (industry.includes('furnishing')) return 'couch'
  if (industry.includes('home')) return 'home'
  if (industry.includes('personal care')) return 'heart'
  if (industry.includes('industrial')) return 'industry-alt'
  if (industry.includes('information')) return 'info-square'
  if (industry.includes('insurance')) return 'life-ring'
  if (industry.includes('oil')) return 'gas-pump'
  if (industry.includes('retail')) return 'store'
  if (industry.includes('software')) return 'browser'
  if (industry.includes('invest')) return 'money-bill-wave'
  if (industry.includes('lumber')) return 'axe'
  if (industry.includes('bank')) return 'piggy-bank'
  if (industry.includes('health')) return 'briefcase-medical'
  if (industry.includes('marine')) return 'ship'
  if (industry.includes('media')) return 'tv'
  if (industry.includes('laboratories')) return 'microscope'
  if (industry.includes('medical')) return 'briefcase-medical'
  if (industry.includes('medicinal')) return 'capsules'
  if (industry.includes('clothing')) return 'tshirt'
  if (industry.includes('metal')) return 'coin'
  if (industry.includes('pharmaceutical')) return 'capsules'
  if (industry.includes('manufacturing')) return 'industry-alt'
  if (industry.includes('theater')) return 'theater-masks'
  if (industry.includes('movie')) return 'film'
  if (industry.includes('housing')) return 'house'
  if (industry.includes('office equipment')) return 'phone-office'
  if (industry.includes('transportation')) return 'bus'
  if (industry.includes('payroll')) return 'users'
  if (industry.includes('personnel')) return 'users'
  if (industry.includes('family')) return 'users'
  if (industry.includes('book')) return 'book'
  if (industry.includes('newspaper')) return 'newspaper'
  if (industry.includes('paper')) return 'print'
  if (industry.includes('radio')) return 'broadcast-tower'
  if (industry.includes('railroad')) return 'train'
  if (industry.includes('restaurant')) return 'utensils'
  if (industry.includes('roofing')) return 'house'
  if (industry.includes('securities')) return 'money-check-edit-alt'
  if (industry.includes('semiconductor')) return 'microchip'
  if (industry.includes('store')) return 'store'
  if (industry.includes('supermarket')) return 'store'
  if (industry.includes('textile')) return 'tshirt'
  if (industry.includes('tobacco')) return 'smoking'
  if (industry.includes('tools')) return 'tools'
  if (industry.includes('travel')) return 'island-tropical'
  if (industry.includes('water')) return 'water'
  if (industry.includes('wholesale')) return 'box-alt'

  if (industry.includes('communications')) return 'satellite'
  if (industry.includes('discount')) return 'badge-dollar'
  if (industry.includes('motor vehicles')) return 'car'
  if (industry.includes('savings')) return 'piggy-bank'
  if (industry.includes('financial')) return 'dollar-sign'
  if (industry.includes('chemical')) return 'flask'
  if (industry.includes('food')) return 'utensils'
  if (industry.includes('real estate')) return 'sign'
  if (industry.includes('real estate')) return 'sign'
  if (industry.includes('tv')) return 'tv'
  if (industry.includes('processing')) return 'microchip'
}
