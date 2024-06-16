interface DocTypeCellRendererProps {
    value: string;
  }
  
const DocTypeCellRenderer: React.FC<DocTypeCellRendererProps> = ({ value }) => {
    let color:string = ''
    if(value === 'Docs Verified')
        color = 'rgb( 90, 139, 48)'
    else if( value === 'Missing Docs')
        color = 'rgb(190, 87, 0)'
    else if( value === 'Docs to Review')
        color = 'rgb(219, 162, 0)'
    return (
      <div>
        <span style={{ color: 'white', backgroundColor: `${color}`, padding: '4px 15px',borderRadius: '15px'}}>{value}</span>
      </div>
    );
  };

export default DocTypeCellRenderer;
