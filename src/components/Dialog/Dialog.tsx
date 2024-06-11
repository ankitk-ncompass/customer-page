import React, { useState } from 'react';
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
} from '@mui/material';

interface FilterTypes{
    label: string;
    value: string;
    count?: number;
}

interface DialogProps {
  filterTypes: FilterTypes[];
  title: string;
  label: string;
  open: boolean;
  onClose: () => void;
  onApply: (selectedTypesArray: string[], title: string) => void;
}

const FilterDialog: React.FC<DialogProps> = ({filterTypes, title, label, open, onClose, onApply }) => {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({});
  const [selectedTypesArray, setSelectedTypesArray] = useState<string[]>([]);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
 
    setSelectedTypes((prev) => ({ ...prev, [name]: checked }));
    setSelectedTypesArray((prev) => {
      if(checked){
      if(!prev.includes(name)){
        return [...prev, name]
      }
      return prev
    }
    else{
      return prev.filter(item => item !== name);
    }
    })
  };

  const handleApply = () => {
    onApply(selectedTypesArray, title);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
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
                label={`${type.label}${type.count? `(${type.count})` : ''}`} 
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Clear</Button>
        <Button onClick={handleApply} variant="contained">Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
