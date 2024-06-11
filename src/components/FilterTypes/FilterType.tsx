import React from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button';
import FilterDialog from '../Dialog/Dialog';

interface FilterTypes{
    label: string;
    value: string;
    count?: number;
}

  interface FilterSectionProps{
    handleApply: (selectedTypesArray: string[], title: string) => void;
    label: string;
    title: string;
    filterTypes: FilterTypes[];
  }
  
const FilterType:React.FC<FilterSectionProps> = ({filterTypes, label, title, handleApply}) => {
    const [openCustomerType, setOpenCustomerType] = useState(false)
  const [close, setClose] = useState(true)
  

  const handleClose = () => {
    setOpenCustomerType(false)
  }

  const handleOpen = () => {
    setOpenCustomerType(true)
  }


  return (
    <div>
        <Button variant="outlined" onClick={handleOpen}>{label}</Button>
        <FilterDialog label={label} title={title} filterTypes={filterTypes} open={openCustomerType} onClose={handleClose} onApply={handleApply} />
    </div>
  )
}

export default FilterType