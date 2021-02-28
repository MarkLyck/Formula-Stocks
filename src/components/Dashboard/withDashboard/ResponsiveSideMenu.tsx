import SideMenu from './SideMenu'
import { Drawer } from 'antd'

export type SideMenuProps = {
  collapsed: boolean
  setCollapsed: () => void
  sideMenuIsVisible: boolean
  onClose: () => void
  onLinkClick: () => void
}

const ResponsiveSideMenu = ({ sideMenuIsVisible, onClose, collapsed, setCollapsed }: SideMenuProps) => {
  return (
    <Drawer
      width={collapsed ? 80 : 200}
      placement="left"
      closable={false}
      onClose={onClose}
      visible={sideMenuIsVisible}
    >
      <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} onLinkClick={onClose} />
    </Drawer>
  )
}
export default ResponsiveSideMenu
