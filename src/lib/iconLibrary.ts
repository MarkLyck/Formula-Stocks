import { config, library } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

// Regular
import {
  faAnalytics as farAnalytics,
  faBars as farBars,
  faBrain as farBrain,
  faDollarSign as farDollarSign,
  faEnvelope as farEnvelope,
  faInfoCircle as farInfoCircle,
  faInfoSquare as farInfoSquare,
  faLockAlt as farLockAlt,
  faNewspaper as farNewspaper,
  faPercent as farPercent,
  faRedo as farRedo,
  faQuestionCircle as farQuestionCircle,
  faTags as farTags,
  faTimes as farTimes,
  faUser as farUser,
} from '@fortawesome/pro-regular-svg-icons'

// Solid
import {
  faAngleDown as fasAngleDown,
  faAngleLeft as fasAngleLeft,
  faAngleRight as fasAngleRight,
  faArrowDown as fasArrowDown,
  faArrowUp as fasArrowUp,
  faBrain as fasBrain,
  faCalculator as fasCalculator,
  faCalendarTimes as fasCalendarTimes,
  faCaretRight as fasCaretRight,
  faChartLine as fasChartLine,
  faChartPie as fasChartPie,
  faCheck as fasCheck,
  faCheckCircle as fasCheckCircle,
  faChevronDoubleRight as fasChevronDoubleRight,
  faCog as fasCog,
  faComments as fasComments,
  faCreditCard as fasCreditCard,
  faEnvelope as fasEnvelope,
  faExclamationCircle as fasExclamationCircle,
  faExclamationTriangle as fasExclamationTriangle,
  faInfoCircle as fasInfoCircle,
  faPercentage as fasPercentage,
  faPiggyBank as fasPiggyBank,
  faQuestionCircle as fasQuestionCircle,
  faSearch as fasSearch,
  faSpinnerThird as fasSpinnerThird,
  faTags as fasTags,
  faUser as fasUser,
  faUserHeadset as fasUserHeadset,
} from '@fortawesome/pro-solid-svg-icons'

// DuoTone
import {
  faAbacus as fadAbacus,
  faAnalytics as fadAnalytics,
  faArrowSquareDown as fadArrowSquareDown,
  faArrowSquareUp as fadArrowSquareUp,
  faAxe as fadAxe,
  faBaby as fadBaby,
  faBadgeDollar as fadBadgeDollar,
  faBalanceScaleRight as fadBalanceScaleRight,
  faBiohazard as fadBiohazard,
  faBolt as fadBolt,
  faBook as fadBook,
  faBoot as fadBoot,
  faBoxAlt as fadBoxAlt,
  faBrain as fadBrain,
  faBriefcaseMedical as fadBriefcaseMedical,
  faBroadcastTower as fadBroadcastTower,
  faBrowser as fadBrowser,
  faBus as fasBus,
  faCalculator as fadCalculator,
  faCalendar as fadCalendar,
  faCandyCane as fadCandyCane,
  faCapsules as fadCapsules,
  faCar as fadCar,
  faChartPie as fadChartPie,
  faChartLine as fadChartLine,
  faChartLineDown as fadChartLineDown,
  faCheckSquare as fadCheckSquare,
  faClock as fadClock,
  faCoin as fadCoin,
  faComment as fadComment,
  faComments as fadComments,
  faConstruction as fadConstruction,
  faCouch as fadCouch,
  faCreditCard as fadCreditCard,
  faDice as fadDice,
  faDollarSign as fadDollarSign,
  faEnvelope as fadEnvelope,
  faExclamationSquare as fadExclamationSquare,
  faExclamationTriangle as fadExclamationTriangle,
  faFighterJet as fadFighterJet,
  faFileAlt as fadFileAlt,
  faFileChartLine as fadFileChartLine,
  faFilm as fadFilm,
  faFlask as fadFlask,
  faGasPump as fadGasPump,
  faGlobeAmericas as fadGlobeAmericas,
  faGift as fadGift,
  faHandHoldingUsd as fadHandHoldingUsd,
  faHandshake as fadHandshake,
  faHdd as fadHdd,
  faHeart as fadHeart,
  faHospital as fadHospital,
  faHotel as fadHotel,
  faHourglassStart as fadHourglassStart,
  faHouse as fadHouse,
  faIndustryAlt as fadIndustryAlt,
  faInfoSquare as fadInfoSquare,
  faIslandTropical as fadIslandTropical,
  faLifeRing as fadLifeRing,
  faLightbulb as fadLightbulb,
  faLockAlt as fadLockAlt,
  faMeat as fadMeat,
  faMicrochip as fadMicrochip,
  faMicrophoneStand as fadMicrophoneStand,
  faMicroscope as fadMicroscope,
  faMinusCircle as fadMinusCircled,
  faMoneyBill as fadMoneyBill,
  faMoneyBillWave as fadMoneyBillWave,
  faMoneyCheckEditAlt as fadMoneyCheckEditAlt,
  faMouse as fadMouse,
  faNewspaper as fadNewspaper,
  faTools as fadTools,
  faSignOutAlt as fadSignOutAlt,
  faHistory as fadHistory,
  faOilCan as fadOilCan,
  faOven as fadOven,
  faPause as fadPause,
  faPauseCircle as fadPauseCircle,
  faPennant as fadPennant,
  faPercent as fadPercent,
  faPercentage as fadPercentage,
  faPhoneAlt as fadPhoneAlt,
  faPhoneOffice as fadPhoneOffice,
  faPiggyBank as fadPiggyBank,
  faPlane as fadPlane,
  faPlayCircle as fadPlayCircle,
  faPlug as fadPlug,
  faPlusCircle as fadPlusCircle,
  faPrint as fadPrint,
  faQuestion as fadQuestion,
  faQuestionCircle as fadQuestionCircle,
  faRecycle as fadRecycle,
  faSatellite as fadSatellite,
  faSchool as fadSchool,
  faServer as fadServer,
  faSign as fadSign,
  faShip as fadShip,
  faShippingFast as fadShippingFast,
  faSmoking as fadSmoking,
  faStopCircle as fadStopCircle,
  faStore as fadStore,
  faTachometerAlt as fadTachometerAlt,
  faTally as fadTally,
  faTheaterMasks as fadTheaterMasks,
  faTimesOctagon as fadTimesOctagon,
  faToothbrush as fadToothbrush,
  faTrain as fadTrain,
  faTree as fadTree,
  faTruck as fadTruck,
  faTshirt as fadTshirt,
  faTv as fadTv,
  faUser as fadUser,
  faUsers as fadUsers,
  faUserTie as fadUserTie,
  faUtensils as fadUtensils,
  faWarehouse as fadWarehouse,
  faWater as fadWater,
  faWheat as fadWheat,
  faWindTurbine as fadWindTurbine,
  faWineGlass as fadWineGlass,
} from '@fortawesome/pro-duotone-svg-icons'

// brands
import { faFacebookF, faTwitter, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'

library.add(
  // Regular
  farAnalytics,
  farBars,
  farBrain,
  farDollarSign,
  farEnvelope,
  farInfoCircle,
  farInfoSquare,
  farLockAlt,
  farNewspaper,
  farPercent,
  farRedo,
  farQuestionCircle,
  farTags,
  farTimes,
  farUser,

  // Solid
  fasAngleDown,
  fasAngleLeft,
  fasAngleRight,
  fasArrowDown,
  fasArrowUp,
  fasBrain,
  fasCalculator,
  fasCalendarTimes,
  fasCaretRight,
  fasChartLine,
  fasChartPie,
  fasCheck,
  fasCheckCircle,
  fasChevronDoubleRight,
  fasCog,
  fasComments,
  fasCreditCard,
  fasEnvelope,
  fasExclamationCircle,
  fasExclamationTriangle,
  fasInfoCircle,
  fasPercentage,
  fasPiggyBank,
  fasQuestionCircle,
  fasSearch,
  fasSpinnerThird,
  fasTags,
  fasUser,
  fasUserHeadset,

  // duotone
  fadAbacus,
  fadAnalytics,
  fadArrowSquareDown,
  fadArrowSquareUp,
  fadAxe,
  fadBaby,
  fadBadgeDollar,
  fadBalanceScaleRight,
  fadBiohazard,
  fadBook,
  fadBoot,
  fadBolt,
  fadBoxAlt,
  fadBrain,
  fadBriefcaseMedical,
  fadBroadcastTower,
  fadBrowser,
  fasBus,
  fadCalculator,
  fadCalendar,
  fadCandyCane,
  fadCapsules,
  fadCar,
  fadChartPie,
  fadChartLine,
  fadChartLineDown,
  fadCheckSquare,
  fadClock,
  fadCoin,
  fadComment,
  fadComments,
  fadConstruction,
  fadCouch,
  fadCreditCard,
  fadDice,
  fadDollarSign,
  fadEnvelope,
  fadExclamationSquare,
  fadExclamationTriangle,
  fadFighterJet,
  fadFileAlt,
  fadFileChartLine,
  fadFilm,
  fadFlask,
  fadGasPump,
  fadGift,
  fadGlobeAmericas,
  fadHandHoldingUsd,
  fadHandshake,
  fadHdd,
  fadHeart,
  fadHospital,
  fadHotel,
  fadHourglassStart,
  fadHouse,
  fadIndustryAlt,
  fadInfoSquare,
  fadIslandTropical,
  fadLifeRing,
  fadLightbulb,
  fadLockAlt,
  fadMeat,
  fadMicrochip,
  fadMicrophoneStand,
  fadMicroscope,
  fadMinusCircled,
  fadMoneyBill,
  fadMoneyBillWave,
  fadMoneyCheckEditAlt,
  fadMouse,
  fadNewspaper,
  fadSignOutAlt,
  fadHistory,
  fadOilCan,
  fadOven,
  fadPause,
  fadPauseCircle,
  fadPennant,
  fadPercent,
  fadPercentage,
  fadPhoneAlt,
  fadPhoneOffice,
  fadPiggyBank,
  fadPlane,
  fadPlayCircle,
  fadPlug,
  fadPlusCircle,
  fadPrint,
  fadQuestion,
  fadQuestionCircle,
  fadRecycle,
  fadSatellite,
  fadSchool,
  fadServer,
  fadSign,
  fadShip,
  fadShippingFast,
  fadSmoking,
  fadStopCircle,
  fadStore,
  fadTachometerAlt,
  fadTally,
  fadTheaterMasks,
  fadTimesOctagon,
  fadTools,
  fadToothbrush,
  fadTrain,
  fadTree,
  fadTruck,
  fadTshirt,
  fadTv,
  fadUser,
  fadUsers,
  fadUserTie,
  fadUtensils,
  fadWarehouse,
  fadWater,
  fadWheat,
  fadWindTurbine,
  fadWineGlass,

  // Brands
  faFacebookF,
  faDiscord,
  faTwitter,
  faLinkedin
)
