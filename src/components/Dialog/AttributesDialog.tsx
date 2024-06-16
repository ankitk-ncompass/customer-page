import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Box,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';

import { AggregatedItem, getTagCounts, permissionsData } from '../../utils/countingFunctions';
import { Tag, AttributesDialogProps } from '../../utils/types';


const AttributesDialog: React.FC<AttributesDialogProps> = ({
  open,
  onClose,
  copiedCustomerData,
}) => {

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTagText, setSearchTagText] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchPermissionText, setSearchPermissionText] = useState<string>('');
  const [tabIndex, setTabIndex] = useState(0);
  const tags: Tag[] = getTagCounts(copiedCustomerData);
  const permissions: AggregatedItem[] = permissionsData(copiedCustomerData)

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSearchTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTagText(event.target.value);
  };

  const handleSearchPermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchPermissionText(event.target.value);
  };

  const filteredTags = tags.filter((tag) =>
    tag.label.toLowerCase().includes(searchTagText.toLowerCase())
  );

  const filteredPermissions = permissions.filter((permission)=> 
    permission.value.toLowerCase().includes(searchPermissionText.toLowerCase()))
;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bulk Apply Attributes</DialogTitle>
      <DialogContent>
        <Typography>
          To apply attributes to the selected Customers, choose TAGS or
          PERMISSIONS, checkmark the attributes you wish to apply and then click
          APPLY.
        </Typography>
        <Typography variant="body2">Selected Customers: 3596</Typography>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="TAGS" />
          <Tab label="PERMISSIONS" />
        </Tabs>
        {tabIndex === 0 && (
          <Box>
            <FormControl component="fieldset">
              <TextField
                variant="outlined"
                placeholder="Search Tags"
                fullWidth
                margin="normal"
                value={searchTagText}
                onChange={handleSearchTagChange}
              />
              {filteredTags.map((tag) => (
                <FormControlLabel
                  key={tag.label}
                  control={
                    <Checkbox
                      checked={selectedTags.includes(tag.label)}
                      onChange={() => handleTagChange(tag.label)}
                    />
                  }
                  label={
                    <Chip
                      label={`${tag.label} (${tag.count})`}
                      color="primary"
                    />
                  }
                />
              ))}
            </FormControl>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <FormControl component="fieldset">
              <TextField
                variant="outlined"
                placeholder="Search Permissions"
                fullWidth
                margin="normal"
                value={searchPermissionText}
                onChange={handleSearchPermissionChange}
              />
              {filteredPermissions.map((permission) => (
                <FormControlLabel
                  key={permission.value}
                  control={
                    <Checkbox
                      checked={selectedPermissions.includes(permission.value)}
                      onChange={() => handlePermissionChange(permission.value)}
                    />
                  }
                  label={
                    <Chip
                      label={`${permission.label}(${permission.count})`}
                      color="primary"
                    />
                  }
                />
              ))}
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttributesDialog;
