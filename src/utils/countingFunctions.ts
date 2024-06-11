import customerData from "./customerData";
import { Customer } from "./types"

 type SalesRepCount = {
    label: string;
    value: string;
    count: number;
};

export const getSalesRepCounts = (customers: Customer[]): SalesRepCount[] => {
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

type TagCount = {
    label: string;
    value: string;
    count: number;
};

export const getTagCounts = (customers: Customer[]): TagCount[] => {
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
    return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
  };

  export const defaultCustomer : Customer = {
 
      id: 0,
      buyerNumber: 'DUMMY_NUMBER',
      buyerType: 'GENERIC_CUSTOMER',
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