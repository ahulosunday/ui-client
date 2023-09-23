import React from 'react';
import Barcode from 'react-barcode';
//import { useBarcode } from '@createnextapp/react-barcode';

function Barcodes(props) {

  return <div style={{width:'10'}}><Barcode value={props.value} width={0.9} height={60} /></div>
};

export default Barcodes;