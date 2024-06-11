import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import { ColDef, ColGroupDef } from 'ag-grid-community';

import customerData from '../../utils/customerData';
import { Customer } from '../../utils/types';

interface filteredCustomersType{
  filteredCustomers: Customer[]
}

const CustomerTableAG:React.FC<filteredCustomersType> = ({filteredCustomers}) => {
    const [rowData, setRowData] = useState<any[]>(customerData);
    
    const [colDefs, setColDefs] = useState<(ColDef<any> | ColGroupDef<any>)[]>([
      { field: "buyerName" , headerName:'Customer Name', resizable: false,},
      { field: "id" , resizable: false},
      { field: "buyerType" , resizable: false},
      { field: "registrationStatus" , resizable: false},
      { field: "documentStatus" , resizable: false},
      { field: "salesRepName" , resizable: false},
      { field: "state" , resizable: false},
      { field: "country" , resizable: false},
      { field: "totalActiveUsers" , resizable: false},
      { field: "notesCount" , resizable: false},
      { field: "enabledTags" , resizable: false},
      { field: "lastActiveDate" , resizable: false},
      { field: "createDate" , resizable: false},
      { field: "updateDate" , resizable: false},
    ]);

    return (

        <div className="ag-theme-quartz" style={{ height:'70vh'}} >
          <AgGridReact
              rowData={filteredCustomers}
              columnDefs={colDefs}
          />
        </div>
       )
    }

    export default CustomerTableAG