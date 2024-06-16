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

export interface customerTitleProps{
  showDeactivatedUser:boolean;
  handleDeactivatedUser: () => void;
  saveCustomer: (newCustomer:Customer) => void
}

export interface searchBarProps{
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FilterSectionProps {
  handleApply: (selectedTypesArray: string[], title: string) => void;
  handleCreatedDateFilter: (name: string, value: string) => void;
  createdDateFilter: {
    startDate: string;
    endDate: string;
  }
  updatedDateFilter: {
    startDate: string;
    endDate: string;
  }
  handleUpdatedDateFilter: (name: string, value: string) => void;
  clearFilterParameters: () => void;
  allClear: boolean;
  copiedCustomerData: Customer[]
}

interface FilterTypes{
  label: string;
  value: string;
  count?: number;
}

export interface FilterTypeProps{
  handleApply: (selectedTypesArray: string[], title: string) => void;
  label: string;
  title: string;
  filterTypes: FilterTypes[];
  allClear: boolean;
}

export interface DateFilterProps{
  label: string;
  handleCreatedDateFilter: (name: string, value: string) => void;
  createdDateFilter: {
      startDate:string;
      endDate:string;
  };
  allClear: boolean;
}

export interface DialogProps {
filterTypes: FilterTypes[];
title: string;
label: string;
open: boolean;
onClose: () => void;
onApply: (selectedTypesArray: string[], title: string) => void;
handleButtonType: (selectedTypesArray: string[]) => void;
allClear: boolean;
}

export interface dateFilterDialogProps {
  open: boolean;
  onClose: () => void;
  handleCreatedDateFilter: (startDate:string, endDate:string) => void;
  createdDateFilter: {
      startDate:string;
      endDate:string;
  };
  handleButtonType: (startDate:string, endDate:string, choosedOption: string) => void;
  allClear: boolean;
}

export interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void
}

export interface filteredCustomersType{
  filteredCustomers: Customer[]
}

export interface Tag {
  label: string;
  value: string;
  count: number;
}


export interface AttributesDialogProps {
  open: boolean;
  onClose: () => void;
  copiedCustomerData: Customer[];
}