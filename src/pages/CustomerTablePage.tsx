import React, { useState } from 'react'
import CustomerTitle from '../components/CustomerTitle/CustomerTitle'
import SearchBar from '../components/SearchBar/SearchBar'
import FilterSection from '../components/FilterSection/FilterSection'
import CustomerTableAG from '../components/CustomerTableAG/CustomerTableAG'
import customerData from '../utils/customerData'
import { Customer } from '../utils/types'
import { searchCustomersByName } from '../utils/countingFunctions'



const CustomerTablePage = () => {

  const [filterParameters, setFilterParameters] = useState<{ buyerTypes: string[], documentStatuses: any[], salesReps: string[], tags: string[], checkOutStatuses: string[] }>({
    buyerTypes: [],
    documentStatuses: [],
    checkOutStatuses: [],
    salesReps: [],
    tags: []
  })

  const [searchString, setSearchString] = useState('')
  const [showDeactivatedUser, setShowDeactivatedUser] = useState(false)

  const [copiedCustomerData, setCopiedCustomerData] = useState(customerData);

  const saveCustomer = (newCustomer: Customer) => {
    setCopiedCustomerData((prev) => ([...prev, newCustomer]));
  };

  const handleApply = (selectedTypes: string[], title: string) => {
    setFilterParameters((prev) => ({ ...prev, [title]: selectedTypes }))
  }

  const handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value)
  }

  const handleDeactivatedUser:() => void = () => {
    setShowDeactivatedUser(!showDeactivatedUser)
  }

  const tagsMatchFilter = (customer: Customer) => {
    for (let i = 0; i < customer.enabledTags.length; i++) {
      const tag = customer.enabledTags[i];
      if (filterParameters.tags?.includes(tag)) {
        return true;
      }
    }
    return false;
  }

  const filteredCustomers = copiedCustomerData.filter(customer => {
    const buyerTypeMatch = !filterParameters.buyerTypes || filterParameters.buyerTypes.length === 0 || filterParameters.buyerTypes.includes(customer.buyerType);
    const checkoutStatusMatch = !filterParameters.checkOutStatuses || filterParameters.checkOutStatuses.length === 0 || filterParameters.checkOutStatuses.includes(customer.registrationStatus);
    const documentStatusMatch = !filterParameters.documentStatuses || filterParameters.documentStatuses.length === 0 || (customer.documentStatus === null ? filterParameters.documentStatuses.includes('null') : filterParameters.documentStatuses.includes(customer.documentStatus));
    const salesRepMatch = !filterParameters.salesReps || filterParameters.salesReps.length === 0 || (customer.salesRepName === null ? filterParameters.salesReps.includes('null') : filterParameters.salesReps.includes(customer.salesRepName));
    const tagsMatch = !filterParameters.tags || filterParameters.tags.length === 0 || (customer.enabledTags === null ? filterParameters.tags.includes('null') : tagsMatchFilter(customer))
    const deactivatedUser = showDeactivatedUser? customer.active === false : true

    return buyerTypeMatch && checkoutStatusMatch && documentStatusMatch && salesRepMatch && tagsMatch && deactivatedUser;
  });


  const searchedResults = searchCustomersByName(filteredCustomers, searchString);

  return (
    <div>
      <CustomerTitle saveCustomer={saveCustomer} showDeactivatedUser={showDeactivatedUser} handleDeactivatedUser={handleDeactivatedUser}/>
      <SearchBar handleChange={handleChange} />
      <FilterSection handleApply={handleApply} />
      <CustomerTableAG filteredCustomers={searchedResults} />
    </div>
  )
}

export default CustomerTablePage