// import React, { useState } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, MenuItem, Select, FormControl, InputLabel
// } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

// const DateRangeDialog = ({ open, handleClose }) => {
//   const [range, setRange] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleApply = () => {
//     // Handle apply logic here
//     handleClose();
//   };

//   const handleClear = () => {
//     setRange('');
//     setStartDate(null);
//     setEndDate(null);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Select Date Range</DialogTitle>
//       <DialogContent>
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Date Range</InputLabel>
//           <Select
//             value={range}
//             onChange={(e) => setRange(e.target.value)}
//             fullWidth
//           >
//             <MenuItem value="today">Today</MenuItem>
//             <MenuItem value="last7days">Last 7 days + Today</MenuItem>
//             <MenuItem value="last14days">Last 14 days + Today</MenuItem>
//             <MenuItem value="last28days">Last 28 days + Today</MenuItem>
//             <MenuItem value="custom">Custom</MenuItem>
//           </Select>
//         </FormControl>
//         {range === 'custom' && (
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="Start Date"
//               value={startDate}
//               onChange={(date) => setStartDate(date)}
//               renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
//             />
//             <DatePicker
//               label="End Date"
//               value={endDate}
//               onChange={(date) => setEndDate(date)}
//               renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
//             />
//           </LocalizationProvider>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClear}>Clear</Button>
//         <Button onClick={handleApply} variant="contained" color="primary">Apply</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DateRangeDialog;
