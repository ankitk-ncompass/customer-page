import React, { useState } from 'react'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FormControlLabel, Switch } from '@mui/material';

import AddCustomerDialog from '../Dialog/AddCustomerDIalog';
import { Customer } from '../../utils/types';
import {customerTitleProps} from "../../utils/types"

import "./CustomerTitle.css"


const CustomerTitle:React.FC<customerTitleProps> = ({saveCustomer, showDeactivatedUser, handleDeactivatedUser}) => {
  const [addCustomerDialogOpen, setAddCustomerDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setAddCustomerDialogOpen(true);
  };
  const handleDialogClose = () => {
    setAddCustomerDialogOpen(false);
  };

  const handleSaveCustomer = (newCustomer: Customer) => {
    saveCustomer(newCustomer)
    setAddCustomerDialogOpen(false);
  };

  return (
    <div className='customer-title-container'>
      <div className='customer-title'>
        <div>Customers</div>
        <Button onClick={handleDialogOpen} variant="contained" className='add-icon-btn'><AddIcon /></Button>
        <AddCustomerDialog open={addCustomerDialogOpen} onClose={handleDialogClose} onSave={handleSaveCustomer}/>
      </div>
      <FormControlLabel
        control={
          <Switch 
          checked={showDeactivatedUser} 
          onChange={handleDeactivatedUser}
          />
        }
        label="Show only Deactivated"
      />
    </div>
  )
}

export default CustomerTitle