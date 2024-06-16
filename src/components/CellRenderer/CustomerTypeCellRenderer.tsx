interface CustomerTypeCellRendererProps {
    value: string;
  }
  
const CustomerTypeCellRenderer: React.FC<CustomerTypeCellRendererProps> = ({ value }) => {
    let color:string = ''
    if(value === 'Customer')
        color = 'rgb( 90, 139, 48)'
    else if(value === 'Prospect')
        color = 'rgb(190, 87, 0)'
    else
        color = ''

    return (
      <div>
        <span style={{ color: 'white', backgroundColor: `${color}`,  padding: '4px 15px',borderRadius: '15px' }}>{value}</span>
      </div>
    );
  };

export default CustomerTypeCellRenderer;

