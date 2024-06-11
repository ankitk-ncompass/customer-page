import React, { useState } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import "./CustomerTitle.css"
import { FormControlLabel, Switch } from '@mui/material';
import AddCustomerDialog from '../Dialog/AddCustomerDIalog';
import { Customer } from '../../utils/types';

interface customerTitleProps{
  showDeactivatedUser:boolean;
  handleDeactivatedUser: () => void;
  saveCustomer: (newCustomer:Customer) => void
}

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
        <h1>Customers</h1>
        <Button onClick={handleDialogOpen} variant="contained"><AddIcon /></Button>
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