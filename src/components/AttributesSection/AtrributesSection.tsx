import { useState } from 'react';

import Button from '@mui/material/Button';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AttributesDialog from '../Dialog/AttributesDialog';

import "./AttributesSection.css"
import { Customer } from '../../utils/types';

interface AtrributesSectionProps{
  copiedCustomerData: Customer[]
}

const AtrributesSection:React.FC<AtrributesSectionProps> = ({copiedCustomerData}) => {

    const [openApplyAtrribute, setOpenApplyAtrribute] = useState(false)

    const handleOpenApplyAttribute = () => {
        setOpenApplyAtrribute(true)
    }

    const handleCloseApplyAttribute = () => {
        setOpenApplyAtrribute(false)
    }

  return (
    <div className='attributes-container'>
        <Button onClick={handleOpenApplyAttribute} variant='contained'><ChecklistIcon />APPLY ATTRIBUTES</Button>
        <AttributesDialog copiedCustomerData={copiedCustomerData} open={openApplyAtrribute} onClose={handleCloseApplyAttribute}/>
        <Button variant='contained'><ChecklistIcon />REMOVE ATTRIBUTES</Button>
    </div>
  )
}

export default AtrributesSection