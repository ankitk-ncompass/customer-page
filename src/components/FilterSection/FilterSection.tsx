import { Button } from '@mui/material';

import { getBuyerTypeCounts, getDocumentStatusCounts, getRegistrationStatusCounts, getSalesRepCounts, getTagCounts } from '../../utils/countingFunctions';
import DateFilter from '../FilterTypes/DateFilter';
import FilterType from '../FilterTypes/FilterType';
import { FilterSectionProps } from '../../utils/types';

import "./FilterSection.css"


const FilterSection: React.FC<FilterSectionProps> = ({ copiedCustomerData, allClear, clearFilterParameters, createdDateFilter, handleApply, handleCreatedDateFilter, updatedDateFilter, handleUpdatedDateFilter }) => {

  const salesRep = getSalesRepCounts(copiedCustomerData)
  const tagsTypes = getTagCounts(copiedCustomerData)
  const documentStatus = getDocumentStatusCounts(copiedCustomerData)
  const checkoutStatus = getRegistrationStatusCounts(copiedCustomerData)
  const customerTypes = getBuyerTypeCounts(copiedCustomerData)
  
  return (
    <div className='filter-section'>
      <FilterType allClear={allClear} label='Customer Types' title='buyerTypes' handleApply={handleApply} filterTypes={customerTypes} />
      <FilterType allClear={allClear} label='Checkout Status' title='checkOutStatuses' handleApply={handleApply} filterTypes={checkoutStatus} />
      <FilterType allClear={allClear} label='Document Status' title='documentStatuses' handleApply={handleApply} filterTypes={documentStatus} />
      <FilterType allClear={allClear} label='SALES REP' title='salesReps' handleApply={handleApply} filterTypes={salesRep} />
      <FilterType allClear={allClear} label='TAGS' title='tags' handleApply={handleApply} filterTypes={tagsTypes} />
      <DateFilter allClear={allClear} label='CREATED' createdDateFilter={createdDateFilter} handleCreatedDateFilter={handleCreatedDateFilter} />
      <DateFilter allClear={allClear} label='UPDATED' createdDateFilter={updatedDateFilter} handleCreatedDateFilter={handleUpdatedDateFilter} />
      <Button className='clear-btn' variant='text' onClick={clearFilterParameters}>Clear</Button>
    </div>
  )
}

export default FilterSection