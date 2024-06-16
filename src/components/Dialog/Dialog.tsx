import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';

import { DialogProps } from '../../utils/types';


const FilterDialog: React.FC<DialogProps> = ({ allClear, filterTypes, title, label, open, onClose, onApply, handleButtonType }) => {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({});
  const [selectedTypesArray, setSelectedTypesArray] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<string>('');


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setSelectedTypes((prev) => ({ ...prev, [name]: checked }));
    setSelectedTypesArray((prev) => {
      if (checked) {
        if (!prev.includes(name)) {
          return [...prev, name]
        }
        return prev
      }
      else {
        return prev.filter(item => item !== name);
      }
    })
  };

  const handleApply = () => {
    onApply(selectedTypesArray, title);
    handleButtonType(selectedTypesArray)
    onClose();
  };

  const handleClear = () => {
    setSelectedTypes({});
    setSelectedTypesArray([]);
    setSelectedRadio('')
    handleButtonType([])
    onApply([], title)
    handleButtonType([])
    onClose()
  }

  useEffect(() => {
    handleClear()
  }, [allClear])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedRadio(value);
    setSelectedTypesArray([value]);
  };

  const isButtonDisabled = () => {
    if (label === 'Checkout Status')
      return selectedRadio.length === 0;
    else
      return selectedTypesArray.length === 0;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          {label === 'Checkout Status' ? (
            <RadioGroup value={selectedRadio} onChange={handleRadioChange}>
              {filterTypes.map((type) => (
                <FormControlLabel
                  key={type.value}
                  control={<Radio />}
                  value={type.value}
                  label={`${type.label}${type.count ? `(${type.count})` : ''}`}
                />
              ))}
            </RadioGroup>
          ) : (
            <FormGroup>
              {filterTypes.map((type) => (
                <FormControlLabel
                  key={type.value}
                  control={
                    <Checkbox
                      checked={!!selectedTypes[type.value]}
                      onChange={handleCheckboxChange}
                      name={type.value}
                    />
                  }
                  label={`${type.label}${type.count ? `(${type.count})` : ''}`}
                />
              ))}
            </FormGroup>)}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear}>Clear</Button>
        <Button
          disabled={isButtonDisabled()}
          onClick={handleApply}
          variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
