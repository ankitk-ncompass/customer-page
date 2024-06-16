import { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { filteredCustomersType } from '../../utils/types';
import CustomerTypeCellRenderer from '../CellRenderer/CustomerTypeCellRenderer';
import CheckoutTypeCellRenderer from '../CellRenderer/CheckoutTypeCellRenderer';
import DocTypeCellRenderer from '../CellRenderer/DocTypeCellRenderer';
import { ColDef } from 'ag-grid-community';


const CustomerTableAG: React.FC<filteredCustomersType> = ({ filteredCustomers }) => {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleRowSelection = (event: any) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node: any) => node.data);
    setSelectedRows(selectedData);
  };

  const [colDefs] = useState<any[]>([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      width: 50,
      pinned: 'left',
    },
    { field: "buyerName", headerName: 'Customer Name', resizable: false, },
    { field: "id", headerName: 'PhoneX Customer ID', resizable: false },
    { field: "buyerType", headerName: 'Customer Type', resizable: false, cellRenderer: CustomerTypeCellRenderer },
    { field: "registrationStatus", headerName: 'Checkout Status', resizable: false, cellRenderer: CheckoutTypeCellRenderer },
    { field: "documentStatus", headerName: 'Document Status', resizable: false, cellRenderer: DocTypeCellRenderer },
    { field: "salesRepName", headerName: 'Sales Rep', resizable: false },
    { field: "state", headerName: 'State', resizable: false },
    { field: "country", headerName: 'Country', resizable: false },
    { field: "totalActiveUsers", headerName: 'Users', resizable: false },
    { field: "notesCount", headerName: 'Notes', resizable: false },
    { field: "enabledTags", headerName: 'Tags', resizable: false },
    { field: "lastActiveDate", headerName: 'Last Active', resizable: false },
    { field: "createDate", headerName: 'Created', resizable: false },
    { field: "updateDate", headerName: 'Updated', resizable: false },
  ]);

  const defaultColDef: ColDef = {
    headerClass: "20",
  };

  return (

    <div className="ag-theme-quartz" style={{ height: '70vh' }} >
      <AgGridReact
        rowData={filteredCustomers}
        columnDefs={colDefs}
        rowSelection="multiple"
        onSelectionChanged={handleRowSelection}
        defaultColDef={defaultColDef}
      />
    </div>
  )
}

export default CustomerTableAG