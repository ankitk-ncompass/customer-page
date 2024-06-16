interface CheckoutTypeCellRendererProps {
    value: string;
  }
  
const CheckoutTypeCellRenderer: React.FC<CheckoutTypeCellRendererProps> = ({ value }) => {
    let color:string = ''
    if(value === 'Ready')
        color = 'rgb( 90, 139, 48)'
    else
        color = 'rgb(190, 87, 0)'
    
    return (
      <div>
        <span style={{ color: 'white', backgroundColor: `${color}`, padding: '4px 15px',borderRadius: '15px' }}>{value}</span>
      </div>
    );
  };

export default CheckoutTypeCellRenderer;