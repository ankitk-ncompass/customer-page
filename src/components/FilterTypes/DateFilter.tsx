import React, { useState } from 'react'

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import DateFilterDialog from '../Dialog/DateFilterDialog';
import { DateFilterProps } from '../../utils/types';


const DateFilter: React.FC<DateFilterProps> = ({ allClear, label, createdDateFilter, handleCreatedDateFilter }) => {
  const [openDateFilterDialog, setopenDateFilterDialog] = useState(false)
  const [btnContained, setBtnContained] = useState(false)
  const [customizedLabel, setCustomizedLabel] = useState('ALL');

  const handleClose = () => {
    setopenDateFilterDialog(false)
  }

  const handleOpen = () => {
    setopenDateFilterDialog(true)
  }



  const handleButtonType = (startDate: string, endDate: string, choosedOption: string) => {
    if (startDate.length > 0 && endDate.length > 0)
      setBtnContained(true)
    else
      setBtnContained(false)
    setCustomizedLabel(choosedOption.length === 0? "ALL" : choosedOption)
  }
  return (
    <div>
      <Button
        className={btnContained ? 'filter-btn-contained btn' : 'filter-btn btn'}
        variant='outlined'
        onClick={handleOpen}>
         {`${label}: `}{customizedLabel}<EditIcon className='editIcon' />
      </Button>
      <DateFilterDialog
        allClear={allClear}
        open={openDateFilterDialog}
        onClose={handleClose}
        createdDateFilter={createdDateFilter}
        handleCreatedDateFilter={handleCreatedDateFilter}
        handleButtonType={handleButtonType} />
    </div>
  )
}

export default DateFilter