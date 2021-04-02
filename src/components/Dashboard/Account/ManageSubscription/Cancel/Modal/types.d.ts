export interface CancelPagePropsType {
  setCancelReason?: (reason: string) => void
  cancelReason?: string
  onCancel: () => void
  cancelLoading: boolean
  onApplyDiscount?: () => void
  applyCouponLoading?: boolean
  user?: any
  onModalDismiss?: () => void
}
