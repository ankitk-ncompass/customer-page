
import {getSalesRepCounts, getTagCounts} from '../../utils/countingFunctions';
import customerData from '../../utils/customerData';
import FilterType from '../FilterTypes/FilterType';

import "./FilterSection.css"


interface FilterSectionProps{
  handleApply: (selectedTypesArray: string[],title: string) => void;
}

const salesRep = getSalesRepCounts(customerData)

const tagsTypes = getTagCounts(customerData)

const documentStatus = [
  { label: 'Blank', value: 'null' },
  { label: 'Missing Docs', value: 'MISSING' },
  { label: 'Docs to Review', value: 'TO_REVIEW' },
  { label: 'Docs Verified', value: 'VERIFIED' },
];

const checkoutStatus = [
  { label: 'Ready', value: 'Complete' },
  { label: 'Checkout OFf', value: 'Incomplete' },
];

const customerTypes = [
  { label: 'Select All', value: 'selectAll' },
  { label: 'Blanks', value: 'blanks' },
  { label: 'CUSTOMER', value: 'GENERIC_CUSTOMER' },
  { label: 'Customer', value: 'customer' },
  { label: 'EXPIRED_VERIFIED_PROSPECT', value: 'EXPIRED_VERIFIED_PROSPECT' },
  { label: 'Prospect', value: 'Prospect' },
  { label: 'REJECTED', value: 'REJECTED' },
  { label: 'Verified Prospect', value: 'VerifiedProspect' },
];

const FilterSection:React.FC<FilterSectionProps> = ({ handleApply}) => {

  return (
    <div className='filter-section'>
      <FilterType  label='Customer Types' title='buyerTypes' handleApply={handleApply} filterTypes = {customerTypes}/>
      <FilterType  label='Checkout Status' title='checkOutStatuses' handleApply={handleApply} filterTypes = {checkoutStatus}/>
      <FilterType  label='Document Status' title='documentStatuses' handleApply={handleApply} filterTypes = {documentStatus}/>
      <FilterType  label='SALES REP' title='salesReps' handleApply={handleApply} filterTypes = {salesRep}/>
      <FilterType  label='TAGS' title='tags' handleApply={handleApply} filterTypes = {tagsTypes}/>
    </div>
  )
}

export default FilterSection