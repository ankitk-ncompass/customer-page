import React, { useState } from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';

import customerData from '../../utils/customerData';
import { defaultCustomer, generateUnique4DigitId, getSalesRepCounts } from '../../utils/countingFunctions';
import { AddCustomerDialogProps } from "../../utils/types"

import "./Dialog.css"

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ open, onClose, onSave }) => {

    const [formValues, setFormValues] = useState({
        buyerName: '',
        salesRepName: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        whatsApp: ''
    });

    const salesRepList = getSalesRepCounts(customerData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSave = () => {
        defaultCustomer['id'] = generateUnique4DigitId();
        const newCustomer = {
            ...defaultCustomer,
            ...formValues,
        };
        onSave(newCustomer);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>
                <TextField
                    className='text-field'
                    margin="dense"
                    name="buyerName"
                    label="Customer Name"
                    required
                    fullWidth
                    value={formValues.buyerName}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Sales Rep</InputLabel>
                    <Select
                        value={formValues.salesRepName}
                        onChange={handleChange}
                        fullWidth
                        name='salesRepName'
                        label='Sales Rep'
                        required
                    >
                        {salesRepList.map(salesRep => <MenuItem key={salesRep.value} value={salesRep.value}>{salesRep.label}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    className='text-field'
                    margin="dense"
                    name="state"
                    label="State"
                    fullWidth
                    value={formValues.state}
                    onChange={handleChange}
                />
                <TextField
                    className='text-field'
                    margin="dense"
                    name="country"
                    label="Country"
                    fullWidth
                    value={formValues.country}
                    onChange={handleChange}
                />
                <TextField
                    className='text-field'
                    margin="dense"
                    name="phone"
                    label="Phone"
                    fullWidth
                    value={formValues.phone}
                    onChange={handleChange}
                />
                <TextField
                    className='text-field'
                    margin="dense"
                    name="email"
                    label="Email"
                    fullWidth
                    value={formValues.email}
                    onChange={handleChange}
                />
                <TextField
                    className='text-field'
                    margin="dense"
                    name="whatsApp"
                    label="WhatsApp"
                    fullWidth
                    value={formValues.whatsApp}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddCustomerDialog;