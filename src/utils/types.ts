type AdditionalField = {
  id: string;
  label: string;
  value: string;
};

type BuyerPaymentMethod = {
  id: string;
  enabled: boolean;
  fields: any[] | null;
};

type BuyerShippingMethod = {
  code: string;
  enabled: boolean;
  fields: any[] | null;
};

type Warehouse = {
  warehouseCode: string;
  enabled: boolean;
};

type CheckoutAdminOption = {
  participantId: any;
  autoCheckoutEnabled: boolean;
  maxWeeklyLimitAmount: number;
};

type AdditionalFields = {
  additionalFields: AdditionalField[];
};

type PaymentMethods = {
  buyerPaymentMethods: BuyerPaymentMethod[];
};

type ShippingMethods = {
  buyerShippingMethods: BuyerShippingMethod[];
};

type Warehouses = {
  tenant: Warehouse[];
  pxn: any;
  checkoutAdminOption: CheckoutAdminOption[] | null;
};

export type Customer = {
  id: number;
  buyerNumber: string;
  buyerType: string;
  buyerName: string;
  prospect: boolean;
  email: string;
  phone: string;
  whatsApp: string;
  country: string;
  state: string;
  salesRepId: number;
  salesRepName: string;
  salesRepEmail: string;
  active: boolean;
  lastActiveDate: string | null;
  lastOrderDate: string | null;
  registrationStatus: string;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  createDate: string;
  updateDate: string;
  additionalFields: AdditionalFields;
  users: string[];
  notesCount: number;
  paymentGracePeriodHrs: number | null;
  reservationFeePercent: number | null;
  cancellationFeePercent: number | null;
  prospectId: number;
  pxnsStatusCode: string | null;
  documentStatus: string | null;
  enabledTags: string[];
  additionalChannels: string[] | null;
  paymentMethods: PaymentMethods;
  shippingMethods: ShippingMethods;
  warehouses: Warehouses;
  offline: boolean;
  unverifiedProspect: boolean;
  isOffline: boolean;
};