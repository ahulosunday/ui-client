import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

function Barcode(props) {
  const { inputRef } = useBarcode({
    value: props.value,
    options: {
      background: 'white',
    }
  });

  return <img ref={inputRef} style={{width:'50%'}} />;
};

export default Barcode;