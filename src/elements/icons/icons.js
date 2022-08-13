// Components
import logoImg from '../../assets/png/logo.png'
import genesisLogo from '../../assets/png/genesis-logo.png'
import hyundaiLogo from '../../assets/png/hyundai-logo.png'
import loadingGif from '../../assets/png/loading.gif'
import compareVersionLogo from '../../assets/png/compare-version.png'
import { ReactComponent as Reset } from '../../assets/svg/Reset.svg'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import { ReactComponent as Dash } from '../../assets/svg/Dash.svg'
import { ReactComponent as Add } from '../../assets/svg/Add.svg'
import { ReactComponent as Hide } from '../../assets/svg/Hide.svg'
import { ReactComponent as Menu } from '../../assets/svg/Menu.svg'
import { ReactComponent as Show } from '../../assets/svg/Show.svg'
import { ReactComponent as Back } from '../../assets/svg/Back.svg'
import { ReactComponent as Next } from '../../assets/svg/Next.svg'
import { ReactComponent as LeftArrow } from '../../assets/svg/left_arrow.svg'
import { ReactComponent as FreeArrow } from '../../assets/svg/Expand_arrows_free_icon_2.svg'
import { ReactComponent as View } from '../../assets/svg/View.svg'
import { ReactComponent as Home } from '../../assets/svg/Home.svg'
import { ReactComponent as Content } from '../../assets/svg/Content.svg'
import { ReactComponent as ROD } from '../../assets/svg/ROD.svg'
import { ReactComponent as CDN } from '../../assets/svg/CDN.svg'
import { ReactComponent as Garage } from '../../assets/svg/Garage.svg'
import { ReactComponent as AddComment } from '../../assets/svg/AddComment.svg'
import { ReactComponent as CommentSpeech } from '../../assets/svg/CommentSpeech.svg'
import { ReactComponent as HomeLight } from '../../assets/svg/HomeLight.svg'
import { ReactComponent as HomeDark } from '../../assets/svg/HomeDark.svg'

// pang
import threeDotImg from '../../assets/png/three-dots.png'

export const LogoIcon = Logo
export const LogoImg = () => <img src={logoImg} alt='genesis_logo' />
export const GenesisLogoImg = () => (
  <img src={genesisLogo} alt='genesis_logo' />
)
export const HyundaiLogoImg = () => (
  <img src={hyundaiLogo} alt='hyundai_logo' />
)
export const CompareVersionLogoImg = () => (
  <img src={compareVersionLogo} alt='compare' />
)
export const ThreeDotImg = () => <img src={threeDotImg} />
export const LoadingGifImg = () => <img src={loadingGif} alt='loading' />

// Icons
export const DashIcon = Dash
export const AddIcon = Add
export const HideIcon = Hide
export const MenuIcon = Menu
export const ShowIcon = Show
export const BackIcon = Back
export const NextIcon = Next
export const LeftArrowIcon = LeftArrow
export const FreeArrowIcon = FreeArrow
export const ViewIcon = View
export const HomeIcon = Home
export const ContentIcon = Content
export const RODIcon = ROD
export const CDNIcon = CDN
export const GarageIcon = Garage
export const ResetIcon = Reset
export const AddCommentIcon = AddComment
export const CommentSpeechIcon = CommentSpeech
export const HomeDarkIcon = HomeDark
export const HomeLightIcon = HomeLight
