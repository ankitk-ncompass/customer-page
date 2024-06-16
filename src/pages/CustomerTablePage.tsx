import React, { useState } from 'react'

import CustomerTitle from '../components/CustomerTitle/CustomerTitle'
import SearchBar from '../components/SearchBar/SearchBar'
import FilterSection from '../components/FilterSection/FilterSection'
import CustomerTableAG from '../components/CustomerTableAG/CustomerTableAG'
import customerData from '../utils/customerData'
import { Customer } from '../utils/types'
import { searchCustomersByName } from '../utils/countingFunctions'
import { modifyCustomerData } from '../utils/countingFunctions'
import AtrributesSection from '../components/AttributesSection/AtrributesSection'


const CustomerTablePage:React.FC = () => {

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
  const [createdDateFilter, setCreatedDateFilter] = useState({
    startDate: '',
    endDate: ''
  })
  const [updatedDateFilter, setUpdatedDateFilter] = useState({
    startDate: '',
    endDate: ''
  })
  const [allClear, setAllClear] = useState(false)



  const handleCreatedDateFilter = (name: string, value: string) => {
    setCreatedDateFilter((prev) => ({...prev, [name]: value}))
  }

  const handleUpdatedDateFilter = (name: string, value: string) => {
    setUpdatedDateFilter((prev) => ({...prev, [name]: value}))
  }

  const saveCustomer = (newCustomer: Customer) => {
    setCopiedCustomerData((prev) => ([newCustomer,...prev ]));
  };

  const handleApply = (selectedTypes: string[], title: string) => {
    setFilterParameters((prev) => ({ ...prev, [title]: selectedTypes }))
  }

  const handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
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

  const clearFilterParameters = () => {
    setAllClear(!allClear)
    setFilterParameters({
      buyerTypes: [],
      documentStatuses: [],
      checkOutStatuses: [],
      salesReps: [],
      tags: []
    })

    setCreatedDateFilter({
      startDate: '',
      endDate: ''
    })

    setUpdatedDateFilter({
      startDate: '',
      endDate: ''
    })
  }

  const filteredCustomers = copiedCustomerData.filter(customer => {
    
    const buyerTypeMatch = !filterParameters.buyerTypes || filterParameters.buyerTypes.length === 0 || filterParameters.buyerTypes.includes(customer.buyerType);
    const checkoutStatusMatch = !filterParameters.checkOutStatuses || filterParameters.checkOutStatuses.length === 0 || filterParameters.checkOutStatuses.includes(customer.registrationStatus);
    const documentStatusMatch = !filterParameters.documentStatuses || filterParameters.documentStatuses.length === 0 || (customer.documentStatus === null ? filterParameters.documentStatuses.includes('null') : filterParameters.documentStatuses.includes(customer.documentStatus));
    const salesRepMatch = !filterParameters.salesReps || filterParameters.salesReps.length === 0 || (customer.salesRepName === null ? filterParameters.salesReps.includes('null') : filterParameters.salesReps.includes(customer.salesRepName));
    const tagsMatch = !filterParameters.tags || filterParameters.tags.length === 0 || (customer.enabledTags === null ? filterParameters.tags.includes('null') : tagsMatchFilter(customer))
    const deactivatedUser = showDeactivatedUser? customer.active === false : true
    const createdDateMatch = (createdDateFilter.startDate.length === 0 || createdDateFilter.endDate.length === 0) || (customer.createDate.slice(0, 10) >= createdDateFilter.startDate && customer.createDate.slice(0, 10) <= createdDateFilter.endDate)
    const updatedDateMatch = (updatedDateFilter.startDate.length === 0 || updatedDateFilter.endDate.length === 0) || (customer.updateDate.slice(0, 10) >= updatedDateFilter.startDate && customer.updateDate.slice(0, 10) <= updatedDateFilter.endDate)

    return buyerTypeMatch && checkoutStatusMatch && documentStatusMatch && salesRepMatch && tagsMatch && deactivatedUser && createdDateMatch && updatedDateMatch;
  });

  const searchedResults = searchCustomersByName(filteredCustomers, searchString);
  const modifiedCustomerData = modifyCustomerData(searchedResults)

  return (
    <div>
      <CustomerTitle saveCustomer={saveCustomer} showDeactivatedUser={showDeactivatedUser} handleDeactivatedUser={handleDeactivatedUser}/>
      <SearchBar handleChange={handleChange} />
      <FilterSection copiedCustomerData={copiedCustomerData} allClear={allClear} clearFilterParameters={clearFilterParameters} handleApply={handleApply} createdDateFilter={createdDateFilter} handleCreatedDateFilter={handleCreatedDateFilter} updatedDateFilter={updatedDateFilter} handleUpdatedDateFilter={handleUpdatedDateFilter}/>
      <AtrributesSection copiedCustomerData={copiedCustomerData}/>
      <CustomerTableAG filteredCustomers={modifiedCustomerData} />
    </div>
  )
}

export default CustomerTablePage