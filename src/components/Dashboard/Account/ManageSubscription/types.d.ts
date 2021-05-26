interface PlanType {
  id: string
  tiers: null
  active: boolean
  amount: number
  object: string
  created: number
  product: string
  currency: string
  interval: string
  livemode: boolean
  metadata: any
  nickname: string
  tiers_mode: any
  usage_type: string
  amount_decimal: string
  billing_scheme: string
  interval_count: number
  aggregate_usage: any
  transform_usage: any
  trial_period_days: any
}

interface PriceType {
  id: string
  type: string
  tiers: any
  active: boolean
  object: string
  created: number
  product: string
  currency: string
  livemode: boolean
  metadata: any
  nickname: string
  recurring: {
    interval: string
    usage_type: string
    interval_count: number
    aggregate_usage: any
    trial_period_days: any
  }
  lookup_key: any
  tiers_mode: any
  unit_amount: number
  billing_scheme: string
  transform_quantity: any
  unit_amount_decimal: string
}

export interface subscriptionType {
  id: string
  plan: PlanType
  items: {
    url: string
    data: [
      {
        id: string
        plan: PlanType
        price: PriceType
        object: string
        created: number
        metadata: any
        quantity: number
        tax_rates: any[]
        subscription: string
        billing_thresholds: any
      }
    ]
    object: string
    has_more: boolean
    total_count: number
  }
  object: string
  status: string
  created: number
  customer: string
  discount: any
  ended_at: any
  livemode: boolean
  metadata: any
  quantity: number
  schedule: any
  cancel_at: any
  trial_end: any
  start_date: 1589639681
  canceled_at: any
  tax_percent: any
  trial_start: any
  days_until_due: any
  default_source: any
  latest_invoice: string
  pending_update: any
  pause_collection: any
  collection_method: string
  default_tax_rates: any[]
  billing_thresholds: any
  current_period_end: number
  billing_cycle_anchor: number
  cancel_at_period_end: false
  current_period_start: number
  pending_setup_intent: any
  default_payment_method: any
  application_fee_percent: any
  pending_invoice_item_interval: any
  invoice_customer_balance_settings: { consume_applied_balance_on_void: boolean }
  next_pending_invoice_item_invoice: any
}
