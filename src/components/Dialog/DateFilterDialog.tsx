import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import calculateDateRange from '../../utils/countingFunctions';
import { dateFilterDialogProps } from '../../utils/types';


const DateFilterDialog: React.FC<dateFilterDialogProps> = ({allClear, open, onClose, createdDateFilter, handleCreatedDateFilter, handleButtonType }) => {
    const [range, setRange] = useState('');

    const handleApply = () => {
        if(range !== 'custom'){
            const dateRange = calculateDateRange(range);
            handleCreatedDateFilter('startDate', dateRange.startDate)
            handleCreatedDateFilter('endDate', dateRange.endDate)
            handleButtonType(dateRange.startDate, dateRange.endDate, range);
        }
       
        onClose();
    };

    const handleDates = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        handleCreatedDateFilter(name, value)
    }

    const handleClear = () => {
        setRange('');
        handleCreatedDateFilter('startDate', '')
        handleCreatedDateFilter('endDate', '')
        handleButtonType('', '', '');
    };

    useEffect(() => {
        handleClear()
      }, [allClear])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Date Range</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Date Range</InputLabel>
                    <Select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        fullWidth
                        label='date range'
                    >
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="last7days">Last 7 days + Today</MenuItem>
                        <MenuItem value="last14days">Last 14 days + Today</MenuItem>
                        <MenuItem value="last28days">Last 28 days + Today</MenuItem>
                        <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    disabled={range !== 'custom'}
                    label="Start Date"
                    type="date"
                    name='startDate'
                    value={createdDateFilter.startDate}
                    onChange={handleDates}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    disabled={range !== 'custom'}
                    label="End Date"
                    name='endDate'
                    type="date"
                    value={createdDateFilter.endDate}
                    onChange={handleDates}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handleApply} disabled={range.length === 0} variant="contained" color="primary">Apply</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DateFilterDialog;
