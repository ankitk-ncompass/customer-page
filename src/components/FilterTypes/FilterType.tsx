import React, { useState } from 'react'

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import FilterDialog from '../Dialog/Dialog';
import { FilterTypeProps } from '../../utils/types';

import "./FilterType.css"
import { concatenateWithCommas, mapValues } from '../../utils/countingFunctions';


const FilterType: React.FC<FilterTypeProps> = ({ allClear, filterTypes, label, title, handleApply }) => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [btnContained, setBtnContained] = useState(false)
  const [customizedLabel, setCustomizedLabel] = useState('');


  const handleClose = () => {
    setOpenFilterDialog(false)
  }

  const handleOpen = () => {
    setOpenFilterDialog(true)
  }


  const handleButtonType = (selectedTypesArray: string[]) => {
    if (selectedTypesArray.length > 0)
      setBtnContained(true)
    else
      setBtnContained(false)

    const mappedLabel = mapValues(selectedTypesArray)
    const concatenatedLabel = concatenateWithCommas(mappedLabel)

    setCustomizedLabel(concatenatedLabel)

  }

  return (
    <div>
      <Button
        className={btnContained ? 'filter-btn-contained btn' : 'filter-btn btn'}
        variant='outlined'
        onClick={handleOpen}>
        <span className='customized-label'>
          {label}: {customizedLabel}
        </span><EditIcon className='editIcon' /></Button>
      <FilterDialog
        allClear={allClear}
        label={label}
        title={title}
        filterTypes={filterTypes}
        open={openFilterDialog}
        onClose={handleClose}
        onApply={handleApply}
        handleButtonType={handleButtonType} />
    </div>
  )
}

export default FilterType