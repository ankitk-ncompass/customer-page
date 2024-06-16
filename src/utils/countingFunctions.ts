import { Customer } from "./types"

type Count = {
  label: string;
  value: string;
  count: number;
};

export const getSalesRepCounts = (customers: Customer[]): Count[] => {
  const salesRepCounts: Record<string, { label: string; value: string; count: number }> = {};

  customers.forEach(customer => {
    const { salesRepName } = customer;

    if (salesRepCounts[salesRepName]) {
      salesRepCounts[salesRepName].count++;
    } else {
      salesRepCounts[salesRepName] = {
        label: salesRepName,
        value: salesRepName,
        count: 1
      };
    }
  });

  return Object.values(salesRepCounts);
}


export const getTagCounts = (customers: Customer[]): Count[] => {
  const tagCounts: Record<string, { label: string; value: string; count: number }> = {};

  customers.forEach(customer => {
    customer.enabledTags.forEach(tag => {
      if (tagCounts[tag]) {
        tagCounts[tag].count++;
      } else {
        tagCounts[tag] = {
          label: tag,
          value: tag,
          count: 1
        };
      }
    });
  });

  return Object.values(tagCounts);
}



const buyerTypeLabels: Record<string, string> = {
  'GENERIC_CUSTOMER': 'Customer',
  'EXPIRED_VERIFIED_PROSPECT': 'EXPIRED_VERIFIED_PROSPECT',
  'UNVERIFIED_PROSPECT': 'Prospect',
  'VERIFIED_PROSPECT': 'Verified Prospect',
  'REJECTED': 'REJECTED',
  '': 'Blanks',
  'CUSTOMER': 'CUSTOMER'
};

export const getBuyerTypeCounts = (customers: Customer[]): Count[] => {
  const buyerTypeCounts: Record<string, { label: string; value: string; count: number }> = {};

  customers.forEach(customer => {
    const buyerType = customer.buyerType;
    const label = buyerTypeLabels[buyerType] || buyerType;

    if (buyerTypeCounts[buyerType]) {
      buyerTypeCounts[buyerType].count++;
    } else {
      buyerTypeCounts[buyerType] = {
        label: label,
        value: buyerType,
        count: 1
      };
    }
  });

  return Object.values(buyerTypeCounts);
};

export const registrationStatusLabels: Record<string, string> = {
  'Complete': 'Ready',
  'Incomplete': 'Checkout Off',
};

export const getRegistrationStatusCounts = (customers: Customer[]): Count[] => {
  const registrationStatusCounts: Record<string, { label: string; value: string; count: number }> = {};

  customers.forEach(customer => {
    const registrationStatus = customer.registrationStatus;
    const label = registrationStatusLabels[registrationStatus] || registrationStatus;

    if (registrationStatusCounts[registrationStatus]) {
      registrationStatusCounts[registrationStatus].count++;
    } else {
      registrationStatusCounts[registrationStatus] = {
        label: label,
        value: registrationStatus,
        count: 1
      };
    }
  });

  return Object.values(registrationStatusCounts);
};

const documentStatusLabels: Record<string, string> = {
  'null': 'Blank',
  'MISSING': 'Missing Docs',
  'TO_REVIEW': 'Docs to Review',
  'VERIFIED': 'Docs Verified',
};

export const getDocumentStatusCounts = (customers: Customer[]): Count[] => {
  const documentStatusCounts: Record<string, { label: string; value: string; count: number }> = {};

  customers.forEach(customer => {
    let documentStatus = customer.documentStatus;
    if (documentStatus === null) {
      documentStatus = 'null'
    }

    const label = documentStatusLabels[documentStatus] || documentStatus;

    if (documentStatusCounts[documentStatus]) {
      documentStatusCounts[documentStatus].count++;
    } else {
      documentStatusCounts[documentStatus] = {
        label: label,
        value: documentStatus,
        count: 1
      };
    }
  });

  return Object.values(documentStatusCounts);
};

// Example usage:


export const searchCustomersByName = (filteredCustomers: Customer[], searchString: string): Customer[] => {
  if (!searchString || searchString.length === 0) {
    return filteredCustomers;
  }

  const lowerCaseSearchString = searchString.toLowerCase();

  return filteredCustomers.filter(customer =>
    customer.buyerName.toLowerCase().includes(lowerCaseSearchString)
  );
};

export const generateUnique4DigitId = (): number => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const defaultCustomer: Customer = {
  id: 0,
  buyerNumber: 'DUMMY_NUMBER',
  buyerType: '',
  buyerName: '',
  prospect: false,
  email: '',
  phone: '',
  whatsApp: '',
  country: '',
  state: '',
  salesRepId: 0,
  salesRepName: '',
  salesRepEmail: '',
  active: true,
  lastActiveDate: new Date().toISOString(),
  lastOrderDate: new Date().toISOString().split('T')[0],
  registrationStatus: 'Complete',
  totalActiveUsers: 0,
  totalInactiveUsers: 0,
  createDate: new Date().toISOString(),
  updateDate: new Date().toISOString(),
  additionalFields: {
    additionalFields: [
      { id: 'lastOrderDate', label: 'Last Order Date', value: new Date().toISOString().split('T')[0] }
    ]
  },
  users: [],
  notesCount: 0,
  paymentGracePeriodHrs: null,
  reservationFeePercent: null,
  cancellationFeePercent: null,
  prospectId: 0,
  pxnsStatusCode: null,
  documentStatus: 'DUMMY_STATUS',
  enabledTags: ['DUMMY_TAG'],
  additionalChannels: ['DUMMY_CHANNEL'],
  paymentMethods: {
    buyerPaymentMethods: [
      { id: 'CREDITCARD', enabled: true, fields: [] },
      { id: 'ACH', enabled: true, fields: null },
      { id: 'WIRE', enabled: true, fields: null },
    ]
  },
  shippingMethods: {
    buyerShippingMethods: [
      { code: 'BILL_MY_ACCOUNT', enabled: true, fields: null }
    ]
  },
  warehouses: {
    tenant: [
      { warehouseCode: 'DUMMY_WAREHOUSE', enabled: true }
    ],
    pxn: null,
    checkoutAdminOption: [
      { participantId: null, autoCheckoutEnabled: false, maxWeeklyLimitAmount: 0 }
    ]
  },
  offline: false,
  unverifiedProspect: false,
  isOffline: false

};


interface DateRange {
  startDate: string;
  endDate: string;
}

const padZero = (num: number) => (num < 10 ? `0${num}` : num);

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  return `${year}-${month}-${day}`;
};

const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const calculateDateRange = (range: string): DateRange => {
  const today = new Date();
  let startDate: Date;

  switch (range) {
    case 'today':
      startDate = today;
      break;
    case 'last7days':
      startDate = subtractDays(today, 6);
      break;
    case 'last14days':
      startDate = subtractDays(today, 13);
      break;
    case 'last28days':
      startDate = subtractDays(today, 27);
      break;
    default:
      throw new Error(`Invalid date range: ${range}`);
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(today),
  };
};

export default calculateDateRange

const convertDateFormat = (dateString: string | null): string => {
  if (dateString === null)
    return ''
  const date = new Date(dateString);
  return date.toDateString();
};


export const modifyCustomerData = (data: Customer[]): Customer[] => {
  return data.map(customer => {
    let modifiedCustomer = { ...customer };

    if (customer.buyerType === 'GENERIC_CUSTOMER') {
      modifiedCustomer.buyerType = 'Customer';
    }
    if (customer.registrationStatus === 'Complete') {
      modifiedCustomer.registrationStatus = 'Ready';
    }

    if (customer.registrationStatus === 'Incomplete') {
      modifiedCustomer.registrationStatus = 'CheckoutOff';
    }

    if (customer.documentStatus === 'VERIFIED') {
      modifiedCustomer.documentStatus = 'Docs Verified';
    }

    if (customer.documentStatus === 'MISSING') {
      modifiedCustomer.documentStatus = 'Missing Docs';
    }

    if (customer.documentStatus === 'TO_REVIEW') {
      modifiedCustomer.documentStatus = 'Docs to Review';
    }

    modifiedCustomer.createDate = convertDateFormat(customer.createDate)
    modifiedCustomer.updateDate = convertDateFormat(customer.updateDate)
    modifiedCustomer.lastActiveDate = convertDateFormat(customer.lastActiveDate)

    return modifiedCustomer;
  });
};


export interface AggregatedItem {
  label: string;
  value: string;
  count: number;
}

export const permissionsData = (customers: Customer[]): AggregatedItem[] => {
  const warehouseCounts: Record<string, number> = {};
  const shippingMethodCounts: Record<string, number> = {};
  const paymentMethodCounts: Record<string, number> = {};

  customers.forEach(customer => {
    if (customer.warehouses && customer.warehouses.tenant) {
      customer.warehouses.tenant.forEach(warehouse => {
        const key = `Warehouse/${warehouse.warehouseCode}`;
        warehouseCounts[key] = warehouseCounts[key] ? warehouseCounts[key] + 1 : 1;
      });
    }

    if (customer.shippingMethods && customer.shippingMethods.buyerShippingMethods) {
      customer.shippingMethods.buyerShippingMethods.forEach(method => {
        const key = `Shipping Method/${method.code}`;
        shippingMethodCounts[key] = shippingMethodCounts[key] ? shippingMethodCounts[key] + 1 : 1;
      });
    }

    if (customer.paymentMethods && customer.paymentMethods.buyerPaymentMethods) {
      customer.paymentMethods.buyerPaymentMethods.forEach(method => {
        const key = `Payment Method/${method.id}`;
        paymentMethodCounts[key] = paymentMethodCounts[key] ? paymentMethodCounts[key] + 1 : 1;
      });
    }
  });

  const aggregateData = [
    ...Object.entries(warehouseCounts).map(([key, count]) => ({
      label: key,
      value: key.split('/')[1],
      count: count,
    })),
    ...Object.entries(shippingMethodCounts).map(([key, count]) => ({
      label: key,
      value: key.split('/')[1],
      count: count,
    })),
    ...Object.entries(paymentMethodCounts).map(([key, count]) => ({
      label: key,
      value: key.split('/')[1],
      count: count,
    })),
  ];

  return aggregateData;
};



export const mapValues = (arr: string[]) => {
  if(arr.length === 0)
    return ["ALL"]
  const mappedArray = arr.map(item => {
    switch (item) {
      case "MISSING":
        return "Missing Data";
      case "null":
        return "Blanks";
      case "VERIFIED":
        return "Verified";
      case "TO_REVIEW":
        return "Needs Review";
      case "GENERIC_CUSTOMER":
        return "Customer";
      case "EXPIRED_VERIFIED_PROSPECT":
        return "EXPIRED_VERIFIED_PROSPECT";
      case "UNVERIFIED_PROSPECT":
        return "Prospect";
      case "VERIFIED_PROSPECT":
        return "Verified Prospect";
      case "CUSTOMER":
        return "CUSTOMER";
      case "EXPIRED_VERIFIED_PROSPECT":
        return "EXPIRED_VERIFIED_PROSPECT";
      case "UNVERIFIED_PROSPECT":
        return "Prospect";
      case "VERIFIED_PROSPECT":
        return "Verified Prospect";
      case "Complete":
        return "Ready";
      case "Incomplete":
        return "Checkout off";
      default:
        return item; 
    }
  });
  return mappedArray;
}

export const concatenateWithCommas = (arr: string[]): string => {
  return arr.join(', ');
}